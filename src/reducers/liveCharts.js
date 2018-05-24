import { combineReducers } from 'redux';
import { SIGN_OUT } from '../actions/auth';
import { ADD_LIVE_CHART, REMOVE_LIVE_CHART, CHANGE_METRIC_LIVE_CHART,
    ADD_HOST_LIVE_CHART, REMOVE_HOST_LIVE_CHART } from '../actions/liveCharts';

const byId = (state = {}, action) => {
    switch (action.type) {
        case ADD_LIVE_CHART:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    metricName: action.metric,
                    metricHostsSelected: []
                }
            };
        case REMOVE_LIVE_CHART:
            const { [action.id]: toRemove, ...rest } = state;
            return rest;
        case CHANGE_METRIC_LIVE_CHART:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    metricName: action.metric,
                    metricHostsSelected: []
                }
            };
        case ADD_HOST_LIVE_CHART:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    metricHostsSelected: [
                        ...state[action.id].metricHostsSelected,
                        action.host
                    ]
                }
            };
        case REMOVE_HOST_LIVE_CHART:
            const all = state[action.id].metricHostsSelected;
            const pos = all.indexOf(action.host);
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    metricHostsSelected: [
                        ...all.slice(0, pos),
                        ...all.slice(pos + 1)
                    ]
                }
            };
        case SIGN_OUT:
            return {};
        default:
            return state;
    }
}

const allIds = (state = [], action) => {
    switch (action.type) {
        case ADD_LIVE_CHART:
            return [
                ...state,
                action.id
            ];
        case REMOVE_LIVE_CHART:
            const pos = state.indexOf(action.id);
            return [
                ...state.slice(0, pos),
                ...state.slice(pos + 1)
            ];
        case SIGN_OUT:
            return [];
        default:
            return state;
    }
};

export default combineReducers({ byId, allIds });

export const getArray = (state) => state.allIds.map(key => state.byId[key]);
