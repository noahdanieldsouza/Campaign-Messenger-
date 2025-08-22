import React, { useState, useEffect } from 'react';
import { getContacts, updateContact, deleteContact } from '../api/contacts';
import { useNavigate } from 'react-router-dom';

const EditContact = () => {
  const navigate = useNavigate();

  // State variables
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', company: '', role: '', email: '' });
  const [message, setMessage] = useState('');
  const [contactUpdated, setContactUpdated] = useState(false);
  const [error, setError] = useState(null);

  // Load contacts on mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await getContacts();
        setContacts(res.data);
      } catch (err) {
        const errorMsg = err.response?.data?.error || err.message || 'Failed to load contacts.';
        setError(errorMsg);
      }
    };
    fetchContacts();
  }, []);

  // Populate form when a contact is selected
  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  // Handle input changes in form
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Update contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateContact(form.id, form);
      setMessage('Contact updated successfully!');
      setContactUpdated(true);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to update contact.';
      setMessage(errorMsg);
    }
  };

  // Delete contact
  const handleDelete = async () => {
    if (!selected) return;

    const confirmDelete = window.confirm(`Delete contact "${selected.name}"?`);
    if (!confirmDelete) return;

    try {
      await deleteContact(selected.id);
      setContacts(contacts.filter((c) => c.id !== selected.id));
      setSelected(null);
      setForm({ name: '', company: '', role: '', email: '' });
      setMessage('Contact deleted successfully!');
      setContactUpdated(true);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to delete contact.';
      setMessage(errorMsg);
    }
  };

  // Reset form to edit another contact
  const handleEditAnother = () => {
    setSelected(null);
    setForm({ name: '', company: '', role: '', email: '' });
    setMessage('');
    setContactUpdated(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <h2>Edit Contact</h2>

      {/* Contact Selector */}
      {!contactUpdated && (
        <>
          <select
            value={selected ? JSON.stringify(selected) : ''}
            onChange={(e) => setSelected(e.target.value ? JSON.parse(e.target.value) : null)}
            style={{ marginBottom: '1rem', width: '300px' }}
          >
            <option value="">Select Contact</option>
            {contacts.map((c) => (
              <option key={c.id} value={JSON.stringify(c)}>
                {c.name} ({c.company})
              </option>
            ))}
          </select>

          {/* Contact Edit Form */}
          {selected && (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
            >
              {['name', 'company', 'role', 'email'].map((field) => (
                <div key={field} style={{ marginBottom: '10px' }}>
                  <label>{field}</label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit">Update</button>
                <button
                  type="button"
                  onClick={handleDelete}
                  style={{ backgroundColor: 'red', color: 'white', marginLeft: '1rem' }}
                >
                  Delete
                </button>
              </div>
            </form>
          )}
        </>
      )}

      {/* Status Message */}
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}

      {/* Post-Update Options */}
      {contactUpdated && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => navigate('/')}>Return Home</button>
          <button onClick={handleEditAnother} style={{ marginLeft: '10px' }}>
            Edit Another
          </button>
        </div>
      )}
    </div>
  );
};

export default EditContact;
