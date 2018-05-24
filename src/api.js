import escapeRegExp from './utils/escapeRegExp';

const apiError = (r) => {
    return Promise.reject({ code: null, error: String(r) });
}

const jsonOrThrow = (r) => {
    return r.ok ? r.json() : Promise.reject({ code: r.status, error: r.statusText })
};

/*

export const signIn = (server, payload) => fetch(`${server}/login`, {
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
}).then(jsonOrThrow, apiError);

export const signUp = (server, payload) => fetch(`${server}/registration`, {
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
}).then(jsonOrThrow, apiError);

*/

export const signIn = () => Promise.resolve({ token: 'token' });
export const signUp = () => Promise.resolve({ token: 'token' });

export const getHosts = (server, token) => fetch(`${server}/hosts?q=.*`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(jsonOrThrow, apiError);

export const getMeasurements = (server, token, metricsWithHosts, start, end) => {
    const q = Object.entries(metricsWithHosts).map(([ metric, hosts ]) => (
        `metric_id:${metric},NAME:/^(${hosts.map(escapeRegExp).join('|')})$/`
    )).join(';');
    const qsParts = { q, start, end };
    const qs = Object.entries(qsParts).filter(([ k, v ]) => v).map(([ k, v ]) => `${k}=${encodeURIComponent(v)}`).join('&');
    return fetch(`${server}/measurements?${qs}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(jsonOrThrow, apiError);
};
