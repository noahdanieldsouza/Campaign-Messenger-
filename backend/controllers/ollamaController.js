const OllamaModel = require('../models/ollamaModel');

/**
 * Controller to handle AI-powered message generation using Ollama.
 * Expects `contactId` and `prompt` in the request body.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the generated message or an error
 */
exports.generateMessage = async (req, res) => {
  const { contactId, prompt } = req.body;

  // Validate input
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Call model to generate message from prompt
    const message = await OllamaModel.generateMessage(prompt);

    // Return generated message
    res.json({ message });
  } catch (err) {
    // Log error and respond with server error
    console.error('Error generating message:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate message' });
  }
};
