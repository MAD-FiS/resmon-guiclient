const express = require('express');
const getUserByToken = require('./auth').getUserByToken;
const moment = require('moment');
const url = require('url');

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const getMonitor = (initHosts) => {

    const app = express();
    let hosts = initHosts;
    let measurements = initHosts.reduce((cHost, host) => {
        const temp1 = host.metrics.map(metric => {
            return {
                hostname: host.hostname,
                metric_id: metric.id,
                data: []
            };
        });
        return cHost.concat(temp1);
    }, []);

    measurements.forEach(m => {
        setInterval(() => {
            m.data.push({
                time: moment().format(),
                value: Math.random() * 100
            });
        }, 5 * 1000);
    });

    const qParser = q => {
        if (!q) {
            return m => m;
        }
        const checkers = q.split(',').map(str => {
            let [ k, v ] = str.split(':');
            if (k === 'NAME') {
                k = 'hostname';
            }
            if (v[0] !== '/') {
                v = '^' + escapeRegExp(v) + '$';
            }
            else {
                v = v.slice(1, -1);
            }
            return m => m[k] && new RegExp(v).test(m[k]);
        });
        return m => checkers.every(c => c(m));
    }

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
    /*app.all('*', (req, res, next) => {
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
    });*/

    app.get('/hosts', (req, res) => res.send(hosts));

    app.get('/measurements', (req, res) => {
        const query = url.parse(req.url, true).query;
        if (!query.start) {
            return res.status(400).send({ error: '"start" is required! (but shouldn\'t)' });
        }
        const startMom = moment(query.start);
        const endMom = query.end ? moment(query.end) : moment();
        const checker = qParser(query.q);
        return res.send(measurements.filter(checker).map(m => ({
            ...m,
            data: m.data.filter(v => moment(v.time).isBetween(startMom, endMom))
        })));
    });

    return app;

}

module.exports = getMonitor;