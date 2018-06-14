import { convertMonitorsToObj, convertMonitorsFromObj } from './reducers/monitors';

const AUTH_SERVER_KEY = 'auth_server';
const MONITORS_KEY = 'monitors';
const TOKEN_KEY = 'token';

export const getAuthServer = () => {
    return localStorage.getItem(AUTH_SERVER_KEY) || undefined;
};

export const updateAuthServer = (authServer) => {
    localStorage.setItem(AUTH_SERVER_KEY, authServer);
};

export const getMonitors = () => {
    const savedValue = localStorage.getItem(MONITORS_KEY);
    if (savedValue) {
        try {
            const parsed = JSON.parse(savedValue);
            const converted = convertMonitorsToObj(parsed);
            if (Object.keys(converted) === 0) {
                return undefined;
            }
            return converted;
        }
        catch (error) {} // eslint-disable-line no-empty
    }
    return undefined;
};

export const updateMonitors = (monitors) => {
    localStorage.setItem(MONITORS_KEY, JSON.stringify(convertMonitorsFromObj(monitors)));
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY) || undefined;
};

export const saveToken = token => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const getSavedState = () => ({
    auth: {
        token: getToken(),
        authServer: getAuthServer()
    },
    monitors: getMonitors()
});
