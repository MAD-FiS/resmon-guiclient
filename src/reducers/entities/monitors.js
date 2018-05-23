import { getSavedMonitors } from '../../middlewares/globalsStorage';
import { CHANGE_MONITOR_ADDRESS, CHANGE_MONITOR_DESCRIPTION, CHANGE_MONITOR, ADD_MONITOR, REMOVE_MONITOR } from '../../actions/monitors';
import { GET_HOSTS_REQUEST, GET_HOSTS_SUCCESS, GET_HOSTS_FAILURE } from '../../actions/hosts';
import { SIGN_OUT } from '../../actions/auth';

const savedMonitors = getSavedMonitors();
const defaultById = savedMonitors.reduce((c, m) => ({
    ...c, [m.address]: {
        ...m,
        hostsIndeterminated: false,
        hosts: null
    }
}), {});

export default (state = defaultById, action) => {
    switch (action.type) {
        case CHANGE_MONITOR_ADDRESS:
            const { [action.address]: targetMonitor, ...restMonitors } = state;
            return {
                ...restMonitors,
                [action.newAddress]: {
                    ...targetMonitor,
                    address: action.newAddress
                }
            };
        case CHANGE_MONITOR_DESCRIPTION:
            return {
                ...state,
                [action.address]: {
                    ...state[action.address],
                    description: action.newDescription
                }
            };
        case CHANGE_MONITOR:
            const { [action.address]: targetMonitorAll, ...restMonitorsAll } = state;
            return {
                ...restMonitorsAll,
                [action.payload.address]: {
                    ...action.payload,
                    hostsIndeterminated: false,
                    hosts: null
                }
            };
        case ADD_MONITOR:
            return {
                ...state,
                [action.payload.address]: {
                    ...action.payload,
                    hostsIndeterminated: false,
                    hosts: null
                }
            };
        case REMOVE_MONITOR:
            const { [action.address]: monitorToRemove, ...monitorsNotToRemove } = state;
            return monitorsNotToRemove;
        case GET_HOSTS_REQUEST:
            return {
                ...state,
                [action.monitor]: {
                    ...state[action.monitor],
                    hostsIndeterminated: true
                }
            };
        case GET_HOSTS_SUCCESS:
            return {
                ...state,
                [action.monitor]: {
                    ...state[action.monitor],
                    hostsIndeterminated: false,
                    hosts: action.payload.result
                }
            };
        case GET_HOSTS_FAILURE:
            return {
                ...state,
                [action.monitor]: {
                    ...state[action.monitor],
                    hostsIndeterminated: false,
                    hosts: null
                }
            };
        case SIGN_OUT:
            return Object.entries(state)
                .reduce((c, [key, obj]) => ({
                    ...c,
                    [key]: {
                        ...obj,
                        hostsIndeterminated: false,
                        hosts: null
                    }
                }), {});
        default:
            return state;
    }
}

export const getArray = (state) => Object.values(state)
    .map(({ address, description }) => ({ address, description }))
    .sort((a, b) => a.address.localeCompare(b.address));
export const getById = (state, address) => state[address];
export const getAddresses = (state) => Object.keys(state);
export const getHostsInvalidated = (state) => Object.values(state).some(m => m.hostsIndeterminated);
