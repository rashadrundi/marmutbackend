const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

const WHATSAPP_API_URL = 'https://graph.facebook.com/v15.0/507894249067656/messages';
const ACCESS_TOKEN = 'EAAIaRHn9pp0BOxpURKBmJpaCZBpUfTljjrp3Jwv9P8jkDsvHdNPIvDd8SOsAIQCZCyJ8Wuwz83gcdJZBqoHZCXId6zgp1oJkCgSdeDHlZCAUf4JAam9yfAnwX1UZByZC8Ic3s4FncArxQGVjK6Uix9ZC6nlzsLOaLPZBawU8SqZCpJ9neKvZArXW2mgbuXJpoP5vSekDFupooiKdAL6WEz48fxNh9CfAogEPYg6xJgJ';

app.use(bodyParser.json());

app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "rashadganteng";

    // Parse the query params
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Verify the token and respond to the challenge
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("Webhook verified");
        res.status(200).send(challenge);
    } else {
        res.status(403).send("Forbidden");
    }
});

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
