const Contact = require('../models/contactModel');

exports.createContact = async (req, res) => {
  try {
    console.log('🔍 Request body:', req.body);
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    console.error('❌ DB ERROR:', err);
    res.status(500).json({ error: err.message || 'Failed to create contact test' });
  }
};


exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.update(req.params.id, req.body);
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.getAll();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

exports.deleteContacts = async (req, res) => {
  try {
    const contacts = await Contact.delete(req.params.id);
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};
