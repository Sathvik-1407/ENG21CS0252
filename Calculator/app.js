const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const WINDOW_SIZE = 10;
let WINDOW = [];

const API_TOKEN = process.env.API_TOKEN;

const fetchNumbersFromServer = async (numberId) => {
    const headers = {
        'Authorization': `Bearer ${API_TOKEN}`
    };

    try {
        let response;
        switch (numberId) {
            case 'p':
                response = await axios.get('http://20.244.56.144/test/primes', { headers, timeout: 500 });
                break;
            case 'e':
                response = await axios.get('http://20.244.56.144/test/even', { headers, timeout: 500 });
                break;
            case 'f':
                response = await axios.get('http://20.244.56.144/test/fibo', { headers, timeout: 500 });
                break;
            case 'r':
                response = await axios.get('http://20.244.56.144/test/rand', { headers, timeout: 500 });
                break;
            default:
                return [];
        }

        return response.data.numbers || [];
    } catch (error) {
        console.error(`Failed to fetch data from server: ${error}`);
        return [];
    }
};

app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params.numberId;
    const numbers = await fetchNumbersFromServer(numberId);

    const previousState = [...WINDOW];

    for (const number of numbers) {
        if (!WINDOW.includes(number)) {
            if (WINDOW.length >= WINDOW_SIZE) {
                WINDOW.shift();
            }
            WINDOW.push(number);
        }
    }

    const currentState = [...WINDOW];
    const average = currentState.length ? currentState.reduce((acc, curr) => acc + curr, 0) / currentState.length : 0;

    const response = {
        numbers,
        windowPrevState: previousState,
        windowCurrState: currentState,
        average
    };

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
