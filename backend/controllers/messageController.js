const Message = require('../models/messageModel');

exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create message' });
  }
};

exports.getMessagesByContact = async (req, res) => {
  try {
    const messages = await Message.getByContactId(req.params.contactId);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Message.getAnalytics();
    res.json(analytics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};
