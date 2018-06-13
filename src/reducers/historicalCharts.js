import { combineReducers } from 'redux';
import * as types from '../actions/types';

export const getHistoricalChartById = (state, id) => state.byId[id];

const chart = (state, action) => {
    switch (action.type) {
        case types.ADD_HISTORICAL_CHART:
            return {
                id: action.payload.id,
                metric1: action.payload.metric,
                metric2: null,
                hosts1: [],
                hosts2: null,
                invalidated: false,
                measurements1: {},
                measurements2: null,
                start: action.payload.start,
                end: action.payload.end
            };
        case types.SET_HISTORICAL_CHART_RANGE:
            return {
                ...state,
                ...action.payload
            };
        case types.SET_HISTORICAL_CHART_METRIC1:
            return {
                ...state,
                metric1: action.payload.metric
            };
        case types.SET_HISTORICAL_CHART_METRIC2:
            return {
                ...state,
                metric2: action.payload.metric,
                hosts2: action.payload.metric ? [] : null,
                measurements2: action.payload.metric ? {} : null
            };
        case types.ADD_HISTORICAL_CHART_HOST1:
            return {
                ...state,
                hosts1: [
                    ...state.hosts1,
                    action.payload.host
                ]
            };
        case types.ADD_HISTORICAL_CHART_HOST2:
            return {
                ...state,
                hosts2: [
                    ...state.hosts2,
                    action.payload.host
                ]
            };
        case types.REMOVE_HISTORICAL_CHART_HOST1: {
            const hostIdx = state.hosts1.indexOf(action.payload.host);
            return {
                ...state,
                hosts1: [
                    ...state.hosts1.slice(0, hostIdx),
                    ...state.hosts1.slice(hostIdx + 1)
                ]
            };
        }
        case types.REMOVE_HISTORICAL_CHART_HOST2: {
            const hostIdx = state.hosts2.indexOf(action.payload.host);
            return {
                ...state,
                hosts2: [
                    ...state.hosts2.slice(0, hostIdx),
                    ...state.hosts2.slice(hostIdx + 1)
                ]
            };
        }
        case types.GET_HISTORICAL_MEASUREMENTS_REQUEST:
            return {
                ...state,
                invalidated: true
            };
        case types.GET_HISTORICAL_MEASUREMENTS_SUCCESS:
            return {
                ...state,
                invalidated: false,
                ...action.payload
            };
        default:
            return state;
    }
};

const byId = (state = {}, action) => {
    switch (action.type) {
        case types.ADD_HISTORICAL_CHART:
            return {
                ...state,
                [action.payload.id]: chart(undefined, action)
            };
        case types.REMOVE_HISTORICAL_CHART: {
            const { [action.meta.id]: target, ...rest } = state; // eslint-disable-line no-unused-vars
            return rest;
        }
        case types.SET_HISTORICAL_CHART_RANGE:
        case types.SET_HISTORICAL_CHART_METRIC1:
        case types.SET_HISTORICAL_CHART_METRIC2:
        case types.ADD_HISTORICAL_CHART_HOST1:
        case types.ADD_HISTORICAL_CHART_HOST2:
        case types.REMOVE_HISTORICAL_CHART_HOST1:
        case types.REMOVE_HISTORICAL_CHART_HOST2:
        case types.GET_HISTORICAL_MEASUREMENTS_REQUEST:
        case types.GET_HISTORICAL_MEASUREMENTS_SUCCESS:
            return {
                ...state,
                [action.meta.id]: chart(state[action.meta.id], action)
            };
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case types.ADD_HISTORICAL_CHART:
            return [
                ...state,
                action.payload.id
            ];
        case types.REMOVE_HISTORICAL_CHART: {
            const targetIdx = state.indexOf(action.meta.id);
            return [
                ...state.slice(0, targetIdx),
                ...state.slice(targetIdx + 1)
            ];
        }
        default:
            return state;
    }
};

export default combineReducers({ byId, allIds });
