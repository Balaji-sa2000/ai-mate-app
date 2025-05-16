import axios from 'axios';

const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;  // Use environment variable
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

/**
 * Translates the given text to the specified target language.
 */
export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        q: text,
        target: targetLanguage,
        format: 'text',
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation API error:', error.response?.data || error.message);
    return '❌ Could not translate text.';
  }
};

/**
 * Fetches supported languages.
 */
export const fetchSupportedLanguages = async (target = 'en') => {
  try {
    const response = await axios.get(`${API_URL}/languages`, {
      params: {
        key: API_KEY,
        target: target,
      },
    });
    return response.data.data.languages;
  } catch (error) {
    console.error('Error fetching supported languages:', error.response?.data || error.message);
    return [];
  }
};
