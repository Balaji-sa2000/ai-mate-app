/**
 * Calls your backend /api/tts to get audio for the given text and language.
 * @param {string} text - The text to convert to speech.
 * @param {string} languageCode - The language code for speech (e.g., 'te-IN', 'es').
 * @returns {Promise<string>} - URL of the generated audio file.
 */
export const callTTS = async (text, languageCode) => {
  try {
    const response = await fetch('https://ai-mate-app.onrender.com/api/tts', {
      method: 'POST',           
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        languageCode,
      }),
    });

    const data = await response.json();

    if (data.audioUrl) {
      return data.audioUrl;
    } else {
      console.error('TTS API error: Invalid response');
      throw new Error('TTS failed');
    }
  } catch (error) {
    console.error('TTS API error:', error);
    throw new Error('TTS API call failed');
  }
};
