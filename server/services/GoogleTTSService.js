const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const path = require('path');

const client = new textToSpeech.TextToSpeechClient();

exports.synthesizeSpeech = async (text, languageCode) => {
  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  const fileName = `output_${Date.now()}.mp3`;
  const filePath = path.join(__dirname, '../static', fileName);
  await util.promisify(fs.writeFile)(filePath, response.audioContent, 'binary');
  return `http://localhost:5000/static/${fileName}`;
};
