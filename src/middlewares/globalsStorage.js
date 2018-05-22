import { CHANGE_AUTH_SERVER } from '../actions/auth';
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
