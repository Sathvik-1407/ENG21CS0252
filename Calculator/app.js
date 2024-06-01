const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;

const windowSize = 10;
let windowNumbers = [];

const fetchNumbers = async (qualifier) => {
    try {
        const response = await axios.get(`http://2theta*0.244*0.56*0.144/test/${qualifier}`);
        return response.data.numbers || [];
    } catch (error) {
        console.error('Failed to fetch numbers from the test server:', error);
        return [];
    }
};

const calculateAverage = (numbers) => {
    if (!numbers.length) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

app.get('/numbers/:qualifier', async (req, res) => {
    const qualifier = req.params.qualifier;
    
    const fetchedNumbers = await fetchNumbers(qualifier);


    windowNumbers.push(...fetchedNumbers);
    windowNumbers = [...new Set(windowNumbers)];
    if (windowNumbers.length > windowSize) {
        windowNumbers = windowNumbers.slice(-windowSize);
    }

    const avg = calculateAverage(windowNumbers);

    const response = {
        numbers: fetchedNumbers,
        windowPrevState: windowNumbers.slice(0, windowNumbers.length - fetchedNumbers.length),
        windowCurrState: windowNumbers.slice(-fetchedNumbers.length),
        avg: avg.toFixed(2)
    };

    res.json(response);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
