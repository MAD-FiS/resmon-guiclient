import * as types from '../actions/types';

export const convertMonitorsToObj = state => {
    try {
        return state.reduce((c, m) => ({
            ...c,
            [m.address]: {
                ...m,
                hostsRequested: false
            }
        }), {});
    }
    catch (error) {
        return {};
    }
};

export const convertMonitorsFromObj = state => Object.values(state)
    .map(({ address, description }) => ({ address, description }));

export const getMonitorsAddresses = state => Object.keys(state);
export const getMonitorsArray = state => Object.values(state);
export const getMonitorsHostsInvalidated = state => Object.values(state).some(m => m.hostsRequested);

const defaultMonitorsObj = convertMonitorsToObj(DEFAULT_MONITORS);

const monitor = (state = {}, action) => {
    switch (action.type) {
        case types.ADD_MONITOR:
            return {
                ...action.payload,
                hostsRequested: false
            };
        case types.SET_MONITOR_ADDRESS:
            return {
                ...state,
                address: action.payload.address
            };
        case types.SET_MONITOR_DESCRIPTION:
            return {
                ...state,
                description: action.payload.description
            };
        case types.GET_HOSTS_REQUEST:
            return {
                ...state,
                hostsRequested: true
            };
        case types.GET_HOSTS_SUCCESS:
        case types.GET_HOSTS_FAILURE:
        case types.REMOVE_TOKEN:
            return {
                ...state,
                hostsRequested: false
            };
        default:
            return state;
    }
};

export default (state = defaultMonitorsObj, action) => {
    switch (action.type) {
        case types.ADD_MONITOR:
            return {
                ...state,
                [action.payload.address]: monitor(undefined, action)
            };
        case types.SET_MONITOR_ADDRESS: {
            const { [action.meta.monitor]: target, ...rest } = state;
            return {
                ...rest,
                [action.payload.address]: monitor(target, action)
            };
        }
        case types.SET_MONITOR_DESCRIPTION:
        case types.GET_HOSTS_REQUEST:
        case types.GET_HOSTS_SUCCESS:
        case types.GET_HOSTS_FAILURE:
            return {
                ...state,
                [action.meta.monitor]: monitor(state[action.meta.monitor], action)
            };
        case types.REMOVE_TOKEN:
            return Object.entries(state).reduce((c, [ k, v ]) => ({
                ...c,
                [k]: monitor(v, action)
            }), {});
        case types.REMOVE_MONITOR: {
            const { [action.meta.monitor]: toRemove, ...notRemoved } = state; // eslint-disable-line no-unused-vars
            return notRemoved;
        }
        default:
            return state;
    }
};
