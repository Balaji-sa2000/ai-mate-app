const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

// Middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/static', express.static(__dirname + '/static'));

// Routes
app.use('/api/tts', require('./routes/tts'));
app.use('/api/chat', require('./routes/chat'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
