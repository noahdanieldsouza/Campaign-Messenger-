import React, { useState, useEffect } from 'react';
import { getContacts } from '../api/contacts';
import { getMessagesByContact, createMessage } from '../api/messages'; 
import { generateMessage } from '../api/ollama';
import axios from 'axios';

const MESSAGE_TYPES = ['Introduction', 'Follow-up', 'Meeting Request'];

const MessageContact = () => {
  // State variables
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageType, setMessageType] = useState(MESSAGE_TYPES[0]);
  const [messageContent, setMessageContent] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load contacts on mount
  useEffect(() => {
    getContacts()
      .then(res => setContacts(res.data))
      .catch(() => setError('Failed to load contacts.'));
  }, []);

  // Load history when a contact is selected
  useEffect(() => {
    if (selectedContact) {
      getMessagesByContact(selectedContact.id)
        .then(res => setHistory(res.data))
        .catch(() => setHistory([]));
    }
  }, [selectedContact]);

  // Templates for AI-generated messages
  const PROMPT_TEMPLATES = {
    'Introduction': (contact, context) =>
      `Generate a professional introduction message for ${contact.name}, who is a ${contact.role} at ${contact.company}. Context: ${context}`,
    'Follow-up': (contact, context) =>
      `Generate a follow-up message for ${contact.name}. Previous interaction: ${context}`,
    'Meeting Request': (contact, context) =>
      `Generate a meeting request message for ${contact.name} at ${contact.company}. Context: ${context}`
  };

  // Generate message using Ollama API
  const handleGenerateMessage = async () => {
    if (!selectedContact) return;

    setLoading(true);
    setError(null);

    // Get context from message history
    const context = history.length > 0
      ? history.map(msg => msg.content).join('\n\n')
      : 'No previous messages available.';

    const templateFn = PROMPT_TEMPLATES[messageType];
    if (!templateFn) {
      setError(`No prompt template found for message type: ${messageType}`);
      setLoading(false);
      return;
    }

    const prompt = templateFn(selectedContact, context);

    try {
      const res = await generateMessage( {
        contactId: selectedContact.id,
        prompt
      });
      setMessageContent(res.data.message || '');
    } catch (err) {
      console.error(err);
      setError('Failed to generate message.');
    } finally {
      setLoading(false);
    }
  };

  // Save message and refresh history
  const handleSaveMessage = async () => {
    if (!messageContent || !selectedContact) return;

    setSaving(true);
    setError(null);

    try {
      await createMessage({
        contact_id: selectedContact.id,
        message_type: messageType,
        content: messageContent
      });

      // Refresh history after saving
      const res = await getMessagesByContact(selectedContact.id);
      setHistory(res.data);
      setMessageContent('');
    } catch (err) {
      setError(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h2>Message Contact</h2>

      {/* Contact Selector */}
      <div>
        <label>Contact:</label>
        <select
          value={selectedContact?.id || ''}
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            const contact = contacts.find(c => c.id === selectedId);
            setSelectedContact(contact || null);
            setMessageContent('');
          }}
        >
          <option value="">-- Select Contact --</option>
          {contacts.map(contact => (
            <option key={contact.id} value={contact.id}>
              {contact.name} ({contact.role} at {contact.company})
            </option>
          ))}
        </select>
      </div>

      {/* Message Type Selector */}
      <div style={{ marginTop: 10 }}>
        <label>Message Type:</label>
        <select value={messageType} onChange={(e) => setMessageType(e.target.value)}>
          {MESSAGE_TYPES.map(type => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <div style={{ marginTop: 10 }}>
        <button onClick={handleGenerateMessage} disabled={loading || !selectedContact}>
          {loading ? 'Generating...' : 'Generate Message'}
        </button>
      </div>

      {/* Editable Message Area */}
      {messageContent && (
        <div style={{ marginTop: 20 }}>
          <h4>Edit Message</h4>
          <textarea
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            rows={6}
            style={{ width: '100%' }}
          />
          <button onClick={handleSaveMessage} disabled={saving}>
            {saving ? 'Saving...' : 'Save Message'}
          </button>
        </div>
      )}

      {/* Message History */}
      {selectedContact && (
        <div style={{ marginTop: 30 }}>
          <h4>Message History with {selectedContact.name}</h4>
          {history.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <ul>
              {history.map((msg, idx) => (
                <li key={idx}>
                  <div>
                    <strong>{msg.message_type}</strong> sent on{' '}
                    {new Date(msg.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                    :
                  </div>
                  <div style={{ marginTop: '0.5em', whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MessageContact;



