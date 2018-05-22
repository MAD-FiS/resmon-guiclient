import { combineReducers } from 'redux';
import { getSavedMonitors } from '../../middlewares/globalsStorage';
import {
    CHANGE_MONITOR_ADDRESS,
    CHANGE_MONITOR_DESCRIPTION,
    CHANGE_MONITOR,
    ADD_MONITOR,
    REMOVE_MONITOR
} from '../../actions/monitors';

const savedMonitors = getSavedMonitors();
const defaultById = savedMonitors.reduce((c, m) => ({ ...c, [m.address]: m }), {});
const defaultAllIds = savedMonitors.map(m => m.address);

const byId = (state = defaultById, action) => {
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
                [action.payload.address]: action.payload
            };
        case ADD_MONITOR:
            const { [action.payload.address]: existingMonitor, ...restMonitorsAdd } = state;
            return {
                ...restMonitorsAdd,
                [action.payload.address]: action.payload
            };
        case REMOVE_MONITOR:
            const { [action.address]: monitorToRemove, ...monitorsNotToRemove } = state;
            return monitorsNotToRemove;
        default:
            return state;
    }
}

const allIds = (state = defaultAllIds, action) => {
    switch (action.type) {
        case CHANGE_MONITOR_ADDRESS:
            const i = state.indexOf(action.address);
            return [
                ...state.slice(0, i),
                action.newAddress,
                ...state.slice(i + 1)
            ];
        case CHANGE_MONITOR:
            const iAll = state.indexOf(action.address);
            return [
                ...state.slice(0, iAll),
                action.payload.address,
                ...state.slice(iAll + 1)
            ];
        case ADD_MONITOR:
            const iAdd = state.indexOf(action.payload.address);
            if (iAdd !== -1) {
                return [
                    ...state.slice(0, iAdd),
                    ...state.slice(iAdd + 1),
                    action.payload.address
                ];
            }
            else {
                return [
                    ...state,
                    action.payload.address
                ];
            }
        case REMOVE_MONITOR:
            const iRemove = state.indexOf(action.address);
            return [
                ...state.slice(0, iRemove),
                ...state.slice(iRemove + 1)
            ];
        default:
            return state;
    }
}

export default combineReducers({ byId, allIds });

export const getArray = (state) => state.allIds.map(id => state.byId[id]);
