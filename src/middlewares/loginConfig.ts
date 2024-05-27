const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
    audience: 'https://localhost:3001/login',
    issuerBaseURL: 'https://dev-uhvweesq2a7gcbbc.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
