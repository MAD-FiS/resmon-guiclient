const express = require('express');
const app = express();

let tokens = {};
let counter = 0;
let users = {
    'jan': 'kowalski'
};

const getToken = (user, password) => `${user}.${password}.${++counter}`;

const getUserByToken = (token) => {
    const result = Object.entries(tokens).filter(([ user, userToken ]) => userToken === token).pop();
    if (result) {
        return result[0];
    }
    return null;
};

app.use(express.json());

// CORS middleware

app.all('*', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    next();
});

app.options('*', (req, res) => {
    res.status(204).send();
});

app.post('/registration', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).send({ error: 'Need to provide username and password' });
    }
    if (users[username]) {
        return res.status(409).send({ error: 'User already exists' });
    }
    users[username] = password;
    const token = getToken(username, password);
    tokens[username] = token;
    return res.status(201).send({ status: 'ok', token });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).send({ error: 'Need to provide username and password' });
    }
    const password2 = users[username];
    if (password !== password2) {
        return res.status(401).send({ error: 'Bad login or password' });
    }
    const token = getToken(username, password);
    tokens[username] = token;
    return res.status(201).send({ status: 'ok', token });
});

app.get('/secret', (req, res) => {
    const authorization = req.get('Authorization') || '';
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) {
        return res.status(400).send({ error: 'Token is not provided' });
    }
    const token = match[1];
    const user = getUserByToken(token);
    return res.status(200).send({ valid: Boolean(user) });
});

module.exports = {
    app,
    getUserByToken
};
