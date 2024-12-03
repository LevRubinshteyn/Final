const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL || 'http://98.14.0.58/api';

app.get('/printer', async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/printer`, {
            headers: { 'X-Api-Key': API_KEY }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching printer data:', error);
        res.status(500).send('Error fetching printer data');
    }
});

app.post('/move', async (req, res) => {
    const { axis, distance } = req.body;

    if (!axis || !distance) {
        return res.status(400).json({ error: 'Axis and distance are required' });
    }

    try {
        const response = await fetch(`${BASE_URL}/printer/command`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': API_KEY
            },
            body: JSON.stringify({
                command: 'jog',
                [axis]: distance
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error sending move command:', error);
        res.status(500).json({ error: 'Failed to send move command' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
