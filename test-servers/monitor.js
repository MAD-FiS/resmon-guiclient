const express = require('express');
const app = express();
const getUserByToken = require('./auth').getUserByToken;

// CORS middleware

app.all('*', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    next();
});

app.options('*', (req, res) => {
    res.status(204).send();
});

// auth middleware
app.all('*', (req, res, next) => {
    const authorization = req.get('Authorization') || '';
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) {
        return res.status(400).send({ error: 'Token is not provided' });
    }
    const token = match[1];
    const user = getUserByToken(token);
    if (!user) {
        return res.status(401).send({ error: 'Bad token' });
    }
    req.user = user;
    next();
});

app.get('/', (req, res) => res.send('ok, ' + req.user));

module.exports = app;