const OllamaModel = require('../models/ollamaModel');

exports.generateMessage = async (req, res) => {
  const { contactId, prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const message = await OllamaModel.generateMessage(prompt);
    res.json({ message });
  } catch (err) {
    console.error('Error generating message:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate message' });
  }
};
