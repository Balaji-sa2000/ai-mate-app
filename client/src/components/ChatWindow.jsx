import React from 'react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, isAITyping, onSpeak }) => (
  <div
    style={{
      background: '#fff',
      flex: 1, // ✅ Allow the chat window to take full height of its parent flex container
      overflowY: 'auto',
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    }}
  >
    {messages.map((msg, index) => (
      <MessageBubble
        key={index}
        sender={msg.sender}
        text={msg.text}
        timestamp={msg.timestamp}
        onSpeak={() => onSpeak(msg.text)}
      />
    ))}
    {isAITyping && <p style={{ color: '#888', fontStyle: 'italic', marginTop: '10px' }}>AI Mate is typing...</p>}
  </div>
);

export default ChatWindow;
