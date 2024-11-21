const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

const WHATSAPP_API_URL = 'https://graph.facebook.com/v15.0/YOUR_PHONE_NUMBER_ID/messages';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

app.use(bodyParser.json());

// Endpoint to send messages to WhatsApp
app.post('/send-message', async (req, res) => {
    const { to, message } = req.body;

    try {
        const response = await axios.post(
            WHATSAPP_API_URL,
            {
                messaging_product: 'whatsapp',
                to,
                type: 'text',
                text: { body: message },
            },
            { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
        );
        res.status(200).send(response.data);
    } catch (error) {
        console.error(error.response.data);
        res.status(500).send({ error: 'Failed to send message' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
