import React from 'react';

const MessageBubble = ({ sender, text, timestamp, onSpeak }) => (
  <div style={{ textAlign: sender === 'User' ? 'right' : 'left', margin: '8px 0', padding: '0 5px' }}>
    <div
      style={{
        display: 'inline-block',
        padding: '12px',
        borderRadius: '15px',
        background: sender === 'User' ? '#dcf8c6' : '#e9e9eb',
        maxWidth: '85%',
        position: 'relative',
        wordBreak: 'break-word',
        fontSize: '15px',
      }}
    >
      <strong style={{ fontSize: '13px' }}>{sender}</strong>
      <p style={{ margin: '5px 0' }}>{text}</p>
      <span style={{ fontSize: '10px', color: '#666', position: 'absolute', right: '8px', top: '8px' }}>{timestamp}</span>
      {sender === 'AI Mate' && (
        <button
          style={{
            fontSize: '14px',
            position: 'absolute',
            right: '8px',
            bottom: '8px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={onSpeak}
        >
          🔊
        </button>
      )}
    </div>
  </div>
);

export default MessageBubble;
