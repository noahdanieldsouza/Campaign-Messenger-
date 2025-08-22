const axios = require('axios');

const OllamaModel = {
  /**
   * Generates a personalized outreach message using the Gemma model via Ollama.
   * @param {string} prompt - Custom prompt content based on contact and message context.
   * @returns {Promise<string>} Generated message as a trimmed string.
   */
  async generateMessage(prompt) {
    // Prepend base context to every prompt to align with Movement Labs' tone and mission
    const baseInstruction = `You are an organizer at Movement Labs, a company dedicated to building progressive power through grassroots organization and voter turnout. 
Based on the information and instruction provided below, generate a professional yet friendly message that furthers Movement Labs' goal.`;

    try {
      const response = await axios.post('http://ollama:11434/api/generate', {
        model: 'gemma:2b',
        prompt: `${baseInstruction}\n\n${prompt}`,
        stream: false,
      });

      // Return the trimmed message content from the LLM response
      return response.data.response?.trim();
    } catch (err) {
      const ollamaError = err.response?.data?.error;

      // Handle specific low-memory error from Ollama
      if (ollamaError && ollamaError.includes('requires more system memory')) {
        const error = new Error('Not enough system memory - please try again later');
        error.status = 503; // Service Unavailable
        throw error;
      }

      // Generic fallback error for any other issue
      const error = new Error('Failed to generate message');
      error.status = 500;
      throw error;
    }
  },
};

module.exports = OllamaModel;

