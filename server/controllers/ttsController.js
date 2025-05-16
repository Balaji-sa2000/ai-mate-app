const { synthesizeSpeech } = require('../services/GoogleTTSService');

exports.handleTTS = async (req, res) => {
  try {
    const { text, languageCode } = req.body;
    if (!text || !languageCode) {
      return res.status(400).json({ error: 'Text and languageCode required' });
    }
    const audioUrl = await synthesizeSpeech(text, languageCode);
    res.json({ audioUrl });
  } catch (error) {
    console.error('TTS Controller Error:', error);
    res.status(500).json({ error: 'TTS Failed' });
  }
};
