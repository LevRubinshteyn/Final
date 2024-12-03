const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL || 'http://98.14.0.58/api';

/// 1ST Endpoint (GET)
app.get('/printer', async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/printer`, {
            headers: { 'X-Api-Key': API_KEY }
        });
        const data = await response.json();
        res.json(data);
    } catch {
        res.status(500).send('Error');
    }
});

//// 2ND Endpoint (POST)
app.post('/move', async (req, res) => {
    const { axis, distance } = req.body;

    if (!axis || typeof distance !== 'number') {
        return res.status(400).send('Invalid input');
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
    } catch {
        res.status(500).send('Error');
    }
});

const PORT = 3000;
app.listen(PORT);
