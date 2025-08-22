const axios = require('axios');

const OllamaModel = {
  async generateMessage(prompt) {
    const baseInstruction = `You are an organizer at Movement Labs, a company dedicated to building progressive power through grassroots organization and voter turnout. 
    Based on the information and instruction provided below, generate a professional yet friendly message that furthers Movement Labs' goal.`;
    try {
      const response = await axios.post('http://ollama:11434/api/generate', {
        model: "gemma:2b",
        prompt: `${baseInstruction}\n\n${prompt}`,
        stream: false,
      });

      return response.data.response?.trim();
    } catch (err) {
      // Handle known Ollama memory error
      const ollamaError = err.response?.data?.error;

      if (ollamaError && ollamaError.includes('requires more system memory')) {
        const error = new Error('Not enough system memory - please try again later');
        error.status = 503; // Service Unavailable
        throw error;
      }

      // Handle any other errors
      const error = new Error('Failed to generate message');
      error.status = 500;
      throw error;
    }
  },
};

module.exports = OllamaModel;

