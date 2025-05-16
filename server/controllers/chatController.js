const { getChatCompletion } = require('../services/OpenAIService');

exports.handleChat = async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const reply = await getChatCompletion(messages);
    res.json({ reply });
  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.status(500).json({ error: 'AI Chat failed' });
  }
};
