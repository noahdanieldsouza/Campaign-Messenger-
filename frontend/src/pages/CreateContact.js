import React, { useState } from 'react';
import { createContact } from '../api/contacts';
import { useNavigate } from 'react-router-dom';

const CreateContact = () => {
  const navigate = useNavigate();

  // State variables
  const [form, setForm] = useState({ name: '', company: '', role: '', email: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [contactCreated, setContactCreated] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact(form);
      setMessage('✅ Contact created successfully!');
      setIsError(false);
      setContactCreated(true);
      setForm({ name: '', company: '', role: '', email: '' });
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.error || err.message || '❌ Failed to create contact.';
      setMessage(errorMsg);
      setIsError(true);
      setContactCreated(false);
    }
  };

  // Reset form to create another contact
  const handleNewContact = () => {
    setMessage('');
    setIsError(false);
    setContactCreated(false);
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
      <h2>Create New Contact</h2>

      {/* Display status message */}
      {message && (
        <p
          style={{
            color: isError ? 'red' : 'green',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}
        >
          {message}
        </p>
      )}

      {/* Contact creation form */}
      {!contactCreated ? (
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
          <button type="submit">Create</button>
        </form>
      ) : (
        /* Post-creation options */
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => navigate('/')}>Return Home</button>
          <button onClick={handleNewContact} style={{ marginLeft: '10px' }}>
            Create Another
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateContact;
