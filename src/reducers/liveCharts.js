import { combineReducers } from 'redux';
import * as types from '../actions/types';

export const getLiveChartsAllIds = state => state.allIds;
export const getLiveChartById = (state, id) => state.byId[id];
export const getLiveChartsArray = state => state.allIds.map(id => state.byId[id]);

const chart = (state, action) => {
    switch (action.type) {
        case types.ADD_LIVE_CHART:
            return {
                ...action.payload,
                hosts: [],
                invalidated: false,
                measurements: {}
            };
        case types.SET_LIVE_CHART_METRIC:
            return {
                ...state,
                hosts: [],
                metric: action.payload.metric
            };
        case types.ADD_LIVE_CHART_HOST:
            return {
                ...state,
                hosts: [
                    ...state.hosts,
                    action.payload.host
                ]
            };
        case types.REMOVE_LIVE_CHART_HOST: {
            const hostIdx = state.hosts.indexOf(action.meta.host);
            return {
                ...state,
                hosts: [
                    ...state.hosts.slice(0, hostIdx),
                    ...state.hosts.slice(hostIdx + 1)
                ]
            };
        }
        case types.GET_LIVE_MEASUREMENTS_REQUEST:
            return {
                ...state,
                invalidated: true
            };
        case types.GET_LIVE_MEASUREMENTS_SUCCESS:
            return {
                ...state,
                invalidated: false,
                measurements: action.payload.measurements
            };
        default:
            return state;
    }
};

const byId = (state = {}, action) => {
    switch (action.type) {
        case types.ADD_LIVE_CHART:
            return {
                ...state,
                [action.payload.id]: chart(undefined, action)
            };
        case types.REMOVE_LIVE_CHART: {
            const { [action.meta.id]: toRemove, ...rest } = state; // eslint-disable-line no-unused-vars
            return rest;
        }
        case types.SET_LIVE_CHART_METRIC:
        case types.ADD_LIVE_CHART_HOST:
        case types.REMOVE_LIVE_CHART_HOST:
        case types.GET_LIVE_MEASUREMENTS_REQUEST:
        case types.GET_LIVE_MEASUREMENTS_SUCCESS:
            return {
                ...state,
                [action.meta.id]: chart(state[action.meta.id], action)
            };
        case types.REMOVE_TOKEN:
            return {};
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case types.ADD_LIVE_CHART:
            return [
                ...state,
                action.payload.id
            ];
        case types.REMOVE_LIVE_CHART: {
            const toRemoveIdx = state.indexOf(action.meta.id);
            return [
                ...state.slice(0, toRemoveIdx),
                ...state.slice(toRemoveIdx + 1)
            ];
        }
        case types.REMOVE_TOKEN:
            return [];
        default:
            return state;
    }
};

export default combineReducers({ byId, allIds });
