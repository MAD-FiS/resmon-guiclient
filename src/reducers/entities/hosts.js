import { GET_HOSTS_SUCCESS, GET_HOSTS_FAILURE } from '../../actions/hosts';
import { CHANGE_MONITOR_ADDRESS, CHANGE_MONITOR, REMOVE_MONITOR } from '../../actions/monitors';
import { SIGN_OUT } from '../../actions/auth';

const cleanPrevHostsFromMonitor = (state, monitor) => Object.entries(state)
    .filter(([ key, obj ]) => obj.monitor !== monitor)
    .reduce((c, [ key, obj ]) => ({
        ...c,
        [key]: obj
    }), {});

export default (state = {}, action) => {
    switch (action.type) {
        case GET_HOSTS_SUCCESS:
            return {
                ...cleanPrevHostsFromMonitor(state, action.monitor),
                ...action.payload.result.reduce((c, h) => ({
                    ...c,
                    [h]: {
                        ...action.payload.entities.hosts[h],
                        monitor: action.monitor
                    }
                }), {})
            };
        case GET_HOSTS_FAILURE:
            return cleanPrevHostsFromMonitor(state, action.monitor);
        case CHANGE_MONITOR:
        case REMOVE_MONITOR:
        case CHANGE_MONITOR_ADDRESS:
            if (action.payload && action.payload.address === action.address) {
                return state;
            }
            return cleanPrevHostsFromMonitor(state, action.address);
        case SIGN_OUT:
            return {};
        default:
            return state;
    }
}
