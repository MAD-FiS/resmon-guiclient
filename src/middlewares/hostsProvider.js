import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT, RESTORE_SESSION } from '../actions/auth';
import { CHANGE_MONITOR_ADDRESS, CHANGE_MONITOR, ADD_MONITOR } from '../actions/monitors';
import { GET_HOSTS_SUCCESS, GET_HOSTS_FAILURE, GET_HOSTS_REQUEST, refreshHosts } from '../actions/hosts';
import { getMonitorsHostsInvalidated } from '../reducers';

const refreshTimeout = 1000 * 60 * 5;
let timeout;

const clearHostsTimeout = () => timeout && clearInterval(timeout);

export default store => next => action => {

    const result = next(action);

    if (
        action.type === SIGN_IN_SUCCESS
        || action.type === SIGN_UP_SUCCESS
        || action.type === RESTORE_SESSION
        || (action.type === CHANGE_MONITOR_ADDRESS && action.address !== action.newAddress)
        || (action.type === CHANGE_MONITOR && action.address !== action.payload.address)
        || action.type === ADD_MONITOR
        || (
            (action.type === GET_HOSTS_FAILURE || action.type === GET_HOSTS_SUCCESS)
            && !getMonitorsHostsInvalidated(store.getState())
        )
    ) {
        clearHostsTimeout();
        if (action.type !== GET_HOSTS_FAILURE && action.type !== GET_HOSTS_SUCCESS) {
            store.dispatch(refreshHosts());
        }
        timeout = setInterval(() => {
            store.dispatch(refreshHosts());
        }, refreshTimeout);
    }

    else if (action.type === SIGN_OUT || action.type === GET_HOSTS_REQUEST) {
        clearHostsTimeout();
    }

    else if (action.type === GET_HOSTS_FAILURE || action.type === GET_HOSTS_SUCCESS) {

    }

    return result;

}
