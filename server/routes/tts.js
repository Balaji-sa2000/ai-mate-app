const express = require('express');
const router = express.Router();
const { handleTTS } = require('../controllers/ttsController');

router.post('/', handleTTS);

module.exports = router;
