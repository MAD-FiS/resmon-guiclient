import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT, CHANGE_AUTH_SERVER, RESTORE_SESSION } from '../actions/auth';
import {
    CHANGE_MONITOR_ADDRESS,
    CHANGE_MONITOR_DESCRIPTION,
    CHANGE_MONITOR,
    ADD_MONITOR,
    REMOVE_MONITOR
} from '../actions/monitors';
import { getAuthServer, getMonitorsArray } from '../reducers';

const AUTH_SERVER_STORAGE_KEY = 'AUTH_SERVER';
const MONITORS_STORAGE_KEY = 'MONITORS';
const TOKEN_KEY = 'TOKEN';

export const getSavedAuthServer = () => {
    return localStorage.getItem(AUTH_SERVER_STORAGE_KEY) || window.DEFAULT_AUTH_SERVER;
};

export const getSavedMonitors = () => {
    const storedMonitors = localStorage.getItem(MONITORS_STORAGE_KEY);
    if (storedMonitors) {
        let parsed;
        try {
            parsed = JSON.parse(storedMonitors);
        }
        catch (err) {}
        if (parsed) {
            return parsed;
        }
    }
    return window.DEFAULT_MONITORS;
}

export default store => next => action => {

    if (action.type === SIGN_IN_SUCCESS || action.type === SIGN_UP_SUCCESS) {
        if (action.credentials.remember) {
            localStorage.setItem(TOKEN_KEY, action.payload.token);
        }
        else {
            localStorage.removeItem(TOKEN_KEY);
        }
    }

    if (action.type === SIGN_OUT) {
        localStorage.removeItem(TOKEN_KEY);
    }

    if (action.type === RESTORE_SESSION) {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            action.token = token;
        }
        else {
            return;
        }
    }

    if (action.type === CHANGE_AUTH_SERVER) {
        const result = next(action);
        const server = getAuthServer(store.getState());
        if (action.server) {
            localStorage.setItem(AUTH_SERVER_STORAGE_KEY, server);
        }
        else {
            localStorage.removeItem(AUTH_SERVER_STORAGE_KEY);
        }
        return result;
    }

    else if (
        action.type === CHANGE_MONITOR_ADDRESS ||
        action.type === CHANGE_MONITOR_DESCRIPTION ||
        action.type === CHANGE_MONITOR ||
        action.type === ADD_MONITOR ||
        action.type === REMOVE_MONITOR
    ) {
        const result = next(action);
        const monitors = getMonitorsArray(store.getState());
        localStorage.setItem(MONITORS_STORAGE_KEY, JSON.stringify(monitors));
        return result;
    }

    return next(action);
};
