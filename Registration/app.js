const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/test/register', (req, res) => {
    const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

    const registrationResponse = {
        companyName: companyName,
        clientID: "37bb493c-73d3-47ea-8675-21f66ef9b735",
        clientSecret: "HVIQBVbqmTGEmaED",
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        rollNo: rollNo
    };

    res.json(registrationResponse);
});

app.post('/test/auth', (req, res) => {
    const { companyName, clientID, clientSecret, ownerName, ownerEmail, rollNo } = req.body;


    const authTokenResponse = {
        token_type: "Bearer",
        access_token: "eyJhbGciOiJIUzIINiIsInR5cCI6IkpXVC39.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEwODM1MjY4LCJpYXQi0jE3MTA4MzQ5NjgsImlzcyI6IkFmZm9yZG11ZCIsImp@aSI6IjM3YmI0OTNjLTczZDMtNDd1YS04Njc1LTIxZjY2ZWY5YjczNSIsInN1YiI6InJhaHVsQGFiYy51ZHUifSwiY29tcGFueU5hbWUi0iJnb@1hcnQiLCJjbGllbnRJRCI6IjM3YmIBOTNjLTczZDMtNDd1YS04Njc1LTIxZjY2ZWY5YjczNSIsImNsaWVudFN1Y3J1dCI6IkhWSVFCVmJxbVRHRW1hRUQiLCJvd251ck5hbWUiOiJSYW h1bCIsIm93bmVyRW1haWwiOiJyYWh1bEBhYmMuZWR1Iiwicm9sbE5vIjoiMS39.gmk2F73GZ7q7EaIGDShc40DKK1zWQ9Up 3xQ-4Dbsu8A",
        expires_in: 1710835268
    };

    res.status(200).json(authTokenResponse);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
