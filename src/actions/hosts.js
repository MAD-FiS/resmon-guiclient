import { normalize } from 'normalizr';
import * as schema from '../schema';
import * as api from '../api';
import { getAuthToken, getMonitorsAddresses } from '../reducers';

export const GET_HOSTS_REQUEST = 'GET_HOSTS_REQUEST';
export const GET_HOSTS_SUCCESS = 'GET_HOSTS_SUCCESS';
export const GET_HOSTS_FAILURE = 'GET_HOSTS_FAILURE';

export const refreshHosts = () => (dispatch, getState) => {
    const state = getState();
    const token = getAuthToken(state);
    const monitors = getMonitorsAddresses(state);
    monitors.forEach(monitor => {
        dispatch({ type: GET_HOSTS_REQUEST, monitor });
        api.getHosts(monitor, token).then(
            (hosts) => {
                dispatch({ type: GET_HOSTS_SUCCESS, payload: normalize(hosts, [schema.host]), monitor })
            },
            ({ code, error }) => {
                dispatch({ type: GET_HOSTS_FAILURE, code, error, monitor });
            }
        );
    });
};
