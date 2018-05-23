import { combineReducers } from 'redux';
import { ADD_LIVE_CHART } from '../actions/liveCharts';

const byId = (state = {}, action) => {
    switch (action.type) {
        case ADD_LIVE_CHART:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    metric: action.metric,
                    selectedHosts: []
                }
            };
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
        default:
            return state;
    }
};

export default combineReducers({ byId, allIds });
