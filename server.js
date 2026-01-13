require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

// API routes for serverless compatibility
const verifyHandler = require('./api/verify');
const downloadHandler = require('./api/download');

app.get('/api/verify', verifyHandler);
app.get('/api/download', downloadHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Secure download server running on port ${PORT}`));

// Export for deployment platforms that require it
module.exports = app;
