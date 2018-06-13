import qs from 'qs';

const apiCall = (address, obj = {}) => fetch(address, obj)
    .then(
        r => new Promise((res, rej) => {
            r.json().then(
                data => res({ r, data }),
                () => rej({ status: r.status, message: String(r.statusText) })
            );
        }),
        error => Promise.reject({ status: null, message: String(error) })
    )
    .then(({ r, data }) => {
        if (!r.ok) {
            throw({ status: r.status, message: data.message || data.detail || data.msg });
        }
        return data;
    });

// ****************************** auth server ******************************

export const login = (server, payload) => apiCall(`${server}/login`, {
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
});

export const registration = (server, payload) => apiCall(`${server}/registration`, {
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
});

// ****************************** monitor ******************************

export const getHosts = (server, token) => apiCall(`${server}/hosts`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const postComplexMetric = (server, token, host, payload) => apiCall(`${server}/metrics/${host}/metrics`, {
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    method: 'POST'
});

export const deleteComplexMetric = (server, token, host, id) => apiCall(`${server}/metrics/${host}/metrics/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    },
    method: 'DELETE'
});

export const getMeasurements = (server, token, query) => {
    query.q = query.q.replace(/hostname/g, 'NAME');
    return apiCall(`${server}/measurements?${qs.stringify(query)}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(measurements => measurements.map(m => ({
        ...m,
        data: m.data.map(({ time, value }) => ({ time: time + 'Z', value }))
    })));
};
