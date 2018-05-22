const apiError = (r) => {
    return Promise.reject({ code: null, error: String(r) });
}

const jsonOrThrow = (r) => {
    return r.ok ? r.json() : Promise.reject({ code: r.status, error: r.statusText })
};

export const signIn = (server, payload) => fetch(`${server}/login`, {
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
}).then(jsonOrThrow, apiError);
