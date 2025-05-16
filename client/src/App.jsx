import React, { useState, useEffect, useRef } from 'react';
import { translateText, fetchSupportedLanguages } from './utils/GoogleTranslate';
import { callChatAPI } from './services/ChatAPI';
import { callTTS } from './services/TTSAPI';
import ChatWindow from './components/ChatWindow'; // ✅ Using new reusable component

function App() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [languages, setLanguages] = useState([]);
  const [autoMode, setAutoMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const loadLanguages = async () => {
      const langs = await fetchSupportedLanguages();
      setLanguages(langs);
    };
    loadLanguages();
  }, []);

  const addMessage = (sender, text) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender, text, timestamp }]);
  };

  const handleTranslate = async () => {
    if (inputText) {
      addMessage('User', inputText);
      setIsAITyping(true);

      try {
        const aiReply = await callChatAPI(messages.map(m => ({ role: m.sender === 'User' ? 'user' : 'assistant', content: m.text })));
        addMessage('AI Mate', aiReply);
      } catch {
        addMessage('AI Mate', '❌ Chat failed.');
      }

      setInputText('');
      setIsAITyping(false);
    }
  };

  const handleSpeak = async (text) => {
    try {
      setIsSpeaking(true);
      const audioUrl = await callTTS(text, targetLanguage);
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsSpeaking(false);
      audio.play();
    } catch (error) {
      console.error('Error calling TTS API:', error);
      setIsSpeaking(false);
      alert('❌ Error generating TTS');
    }
  };

  const startAutoMode = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      addMessage('User', transcript);

      try {
        const translation = await translateText(transcript, targetLanguage);
        addMessage('AI Mate', translation);
        await handleSpeak(translation);
      } catch (error) {
        console.error('Auto-mode error:', error);
      }

      if (autoMode) recognition.start();
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (autoMode) recognition.start();
    };

    recognition.onend = () => {
      if (autoMode) recognition.start();
    };

    recognition.start();
    recognitionRef.current = recognition;
    setAutoMode(true);
  };

  const stopAutoMode = () => {
    recognitionRef.current?.stop();
    setAutoMode(false);
  };

  return (
    <div style={{ maxWidth: '100%', height: '100vh', padding: '10px', boxSizing: 'border-box', background: '#f4f4f4', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ textAlign: 'center' }}>AI Mate Conversation</h1>

      {/* ✅ Using ChatWindow component */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ChatWindow messages={messages} isAITyping={isAITyping} onSpeak={handleSpeak} />

        {isSpeaking && <div style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>🔊 Speaking...</div>}

        <div style={{ marginTop: '10px' }}>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          >
            {languages.map((lang, index) => (
              <option key={index} value={lang.language}>
                {lang.name} ({lang.language})
              </option>
            ))}
          </select>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Say or type something..."
            style={{ width: '100%', height: '60px', padding: '10px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', gap: '10px' }}>
            <button onClick={handleTranslate} style={{ padding: '15px', fontSize: '16px' }}>Send</button>
            <button onClick={autoMode ? stopAutoMode : startAutoMode} style={{ padding: '15px', fontSize: '16px', background: autoMode ? '#f88' : '#8f8' }}>
              {autoMode ? '🛑 Stop Auto Mode' : '🤖 Start Auto Mode'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
