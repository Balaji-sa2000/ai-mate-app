const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Now accepts entire message history
exports.getChatCompletion = async (messages) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  });

  return response.choices[0].message.content;
};
