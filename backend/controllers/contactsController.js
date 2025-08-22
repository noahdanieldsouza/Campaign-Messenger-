const Contact = require('../models/contactModel');

/**
 * Create a new contact.
 * Expects: { name, company, role, email } in the request body.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createContact = async (req, res) => {
  try {
    console.log('🔍 Request body:', req.body);

    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    console.error('❌ DB ERROR:', err);
    res.status(500).json({ error: err.message || 'Failed to create contact' });
  }
};

/**
 * Update an existing contact by ID.
 * Expects: contact ID in req.params.id and updated fields in req.body.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.update(req.params.id, req.body);
    res.json(contact);
  } catch (err) {
    console.error('❌ Update Error:', err);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

/**
 * Get all contacts in the system.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.getAll();
    res.json(contacts);
  } catch (err) {
    console.error('❌ Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

/**
 * Delete a contact by ID.
 * Expects: contact ID in req.params.id.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteContacts = async (req, res) => {
  try {
    const result = await Contact.delete(req.params.id);
    res.json(result);
  } catch (err) {
    console.error('❌ Delete Error:', err);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};
