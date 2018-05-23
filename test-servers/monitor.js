const express = require('express');
const getUserByToken = require('./auth').getUserByToken;

const getMonitor = (initHosts) => {

    const app = express();
    let hosts = initHosts;

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

    // auth middleware
    app.all('*', (req, res, next) => {
        const authorization = req.get('Authorization') || '';
        const match = authorization.match(/^Bearer (.+)$/);
        if (!match) {
            return res.status(401).send({ error: 'Token is not provided' });
        }
        const token = match[1];
        const user = getUserByToken(token);
        if (!user) {
            return res.status(401).send({ error: 'Bad token' });
        }
        req.user = user;
        next();
    });

    app.get('/hosts', (req, res) => res.send(hosts));

    return app;

}

module.exports = getMonitor;