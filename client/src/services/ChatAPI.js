export const callChatAPI = async (messages) => {
  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
  if (data.reply) return data.reply;
  throw new Error('Chat API failed');
};
