require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());


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

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
