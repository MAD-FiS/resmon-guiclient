import { GET_HOSTS_SUCCESS, GET_HOSTS_FAILURE } from '../../actions/hosts';
import { CHANGE_MONITOR_ADDRESS, CHANGE_MONITOR, REMOVE_MONITOR } from '../../actions/monitors';
import { SIGN_OUT } from '../../actions/auth';

const cleanPrevMetricsFromMonitor = (state, monitor) => Object.entries(state)
    .reduce((c, [key, obj]) => ({
        ...c,
        [key]: {
            ...obj,
            hosts: obj.hosts.filter(h => h.monitor !== monitor)
        }
    }), {});

export default (state = {}, action) => {
    switch (action.type) {
        case GET_HOSTS_SUCCESS:
            return Object.entries(action.payload.entities.metrics).reduce((c, [key, obj]) => ({
                ...c,
                [key]: {
                    ...obj,
                    hosts: [
                        ...(c[key] ? c[key].hosts : []),
                        ...Object.values(action.payload.entities.hosts)
                            .filter(h => h.metrics.indexOf(key) !== -1)
                            .map(h => ({ host: h.hostname, monitor: action.monitor }))
                    ]
                }
            }), cleanPrevMetricsFromMonitor(state, action.monitor));
        case GET_HOSTS_FAILURE:
            return cleanPrevMetricsFromMonitor(state, action.monitor);
        case CHANGE_MONITOR:
        case REMOVE_MONITOR:
        case CHANGE_MONITOR_ADDRESS:
            if (action.payload && action.payload.address === action.address) {
                return state;
            }
            return cleanPrevMetricsFromMonitor(state, action.address);
        case SIGN_OUT:
            return {};
        default:
            return state;
    }
}

export const getArray = (state) => Object.values(state).sort((a, b) => a.id.localeCompare(b.id));
