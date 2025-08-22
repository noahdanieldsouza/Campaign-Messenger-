const Message = require('../models/messageModel');

/**
 * Create a new message associated with a contact.
 * Expects: { contact_id, message_type, content } in the request body.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (err) {
    console.error('Error creating message:', err);
    res.status(500).json({ error: 'Failed to create message' });
  }
};

/**
 * Get all messages for a specific contact by ID.
 * Expects: contactId in the request params.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getMessagesByContact = async (req, res) => {
  try {
    const messages = await Message.getByContactId(req.params.contactId);
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

/**
 * Get aggregate message analytics.
 * Includes: total count, messages per day, top contacts.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Message.getAnalytics();
    res.json(analytics);
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};
