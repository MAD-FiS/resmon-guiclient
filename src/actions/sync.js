import moment from 'moment';
import uniqid from 'uniqid';
import * as types from './types';

// ****************************** auth ******************************

export const signInRequest = (payload) => ({
    type: types.SIGN_IN_REQUEST,
    payload
});

export const signInSuccess = (payload) => ({
    type: types.SIGN_IN_SUCCESS,
    payload
});

export const signInFailure = (payload) => ({
    type: types.SIGN_IN_FAILURE,
    payload,
    error: true
});

export const signUpRequest = (payload) => ({
    type: types.SIGN_UP_REQUEST,
    payload
});

export const signUpSuccess = (payload) => ({
    type: types.SIGN_UP_SUCCESS,
    payload
});

export const signUpFailure = (payload) => ({
    type: types.SIGN_UP_FAILURE,
    payload,
    error: true
});

export const removeToken = () => ({
    type: types.REMOVE_TOKEN
});

export const changeAuthServer = (payload) => ({
    type: types.CHANGE_AUTH_SERVER,
    payload
});

// ****************************** monitors ******************************

export const addMonitor = (payload) => ({
    type: types.ADD_MONITOR,
    payload
});

export const setMonitorAddress = (payload, monitor) => ({
    type: types.SET_MONITOR_ADDRESS,
    payload,
    meta: {
        monitor
    }
});

export const setMonitorDescription = (payload, monitor) => ({
    type: types.SET_MONITOR_DESCRIPTION,
    payload,
    meta: {
        monitor
    }
});

export const removeMonitor = (monitor) => ({
    type: types.REMOVE_MONITOR,
    meta: {
        monitor
    }
});

export const getHosts = () => ({
    type: types.GET_HOSTS
});

export const getHostsRequest = (monitor) => ({
    type: types.GET_HOSTS_REQUEST,
    meta: {
        monitor
    }
});

export const getHostsSuccess = (payload, monitor) => ({
    type: types.GET_HOSTS_SUCCESS,
    payload,
    meta: {
        monitor
    }
});

export const getHostsFailure = (payload, monitor) => ({
    type: types.GET_HOSTS_FAILURE,
    payload,
    error: true,
    meta: {
        monitor
    }
});

// ****************************** complex metrics ******************************

export const addComplexMetricRequest = (payload, host) => ({
    type: types.ADD_COMPLEX_METRIC_REQUEST,
    payload,
    meta: {
        host
    }
});

export const addComplexMetricSuccess = (payload, host) => ({
    type: types.ADD_COMPLEX_METRIC_SUCCESS,
    meta: {
        host
    }
});

export const addComplexMetricFailure = (payload, host) => ({
    type: types.ADD_COMPLEX_METRIC_FAILURE,
    payload,
    error: true,
    meta: {
        host
    }
});

export const removeComplexMetricRequest = (id, host) => ({
    type: types.REMOVE_COMPLEX_METRIC_REQUEST,
    meta: {
        id,
        host
    }
});

export const removeComplexMetricSucces = (id, host) => ({
    type: types.REMOVE_COMPLEX_METRIC_SUCCESS,
    meta: {
        id,
        host
    }
});

export const removeComplexMetricFailure = (payload, host) => ({
    type: types.REMOVE_COMPLEX_METRIC_FAILURE,
    payload,
    error: true,
    meta: {
        host
    }
});

// ****************************** live chart ******************************

export const addLiveChart = (payload) => ({
    type: types.ADD_LIVE_CHART,
    payload: {
        ...payload,
        id: uniqid()
    }
});

export const removeLiveChart = (id) => ({
    type: types.REMOVE_LIVE_CHART,
    meta: {
        id
    }
});

export const setLiveChartMetric = (payload, id) => ({
    type: types.SET_LIVE_CHART_METRIC,
    payload,
    meta: {
        id
    }
});

export const addLiveChartHost = (payload, id) => ({
    type: types.ADD_LIVE_CHART_HOST,
    payload,
    meta: {
        id
    }
});

export const removeLiveChartHost = (id, host) => ({
    type: types.REMOVE_LIVE_CHART_HOST,
    meta: {
        id,
        host
    }
});

export const getLiveMeasurementsRequest = (id, initialFetch) => ({
    type: types.GET_LIVE_MEASUREMENTS_REQUEST,
    meta: {
        id,
        initialFetch
    }
});

export const getLiveMeasurementsSuccess = (payload, id) => ({
    type: types.GET_LIVE_MEASUREMENTS_SUCCESS,
    payload,
    meta: {
        id
    }
});

export const getLiveMeasurementsFailure = (payload, id, monitor) => ({
    type: types.GET_LIVE_MEASUREMENTS_FAILURE,
    payload,
    error: true,
    meta: {
        id,
        monitor
    }
});

// ****************************** historical chart ******************************

export const addHistoricalChart = (payload) => ({
    type: types.ADD_HISTORICAL_CHART,
    payload: {
        ...payload,
        id: uniqid(),
        start: moment().subtract(1, 'hours').toISOString(),
        end: moment().toISOString()
    }
});

export const removeHistoricalChart = (id) => ({
    type: types.REMOVE_HISTORICAL_CHART,
    meta: {
        id
    }
});

export const setHistoricalChartRange = (payload, id) => ({
    type: types.SET_HISTORICAL_CHART_RANGE,
    payload,
    meta: {
        id
    }
});

export const setHistoricalChartMetric1 = (payload, id) => ({
    type: types.SET_HISTORICAL_CHART_METRIC1,
    payload,
    meta: {
        id
    }
});

export const setHistoricalChartMetric2 = (payload, id) => ({
    type: types.SET_HISTORICAL_CHART_METRIC2,
    payload,
    meta: {
        id
    }
});

export const addHistoricalChartHost1 = (payload, id) => ({
    type: types.ADD_HISTORICAL_CHART_HOST1,
    payload,
    meta: {
        id
    }
});

export const addHistoricalChartHost2 = (payload, id) => ({
    type: types.ADD_HISTORICAL_CHART_HOST2,
    payload,
    meta: {
        id
    }
});

export const removeHistoricalChartHost1 = (id, host) => ({
    type: types.REMOVE_HISTORICAL_CHART_HOST1,
    meta: {
        id,
        host
    }
});

export const removeHistoricalChartHost2 = (id, host) => ({
    type: types.REMOVE_HISTORICAL_CHART_HOST2,
    meta: {
        id,
        host
    }
});

export const getHistoricalMeasurementsRequest = (id) => ({
    type: types.GET_HISTORICAL_MEASUREMENTS_REQUEST,
    meta: {
        id
    }
});

export const getHistoricalMeasurementsSuccess = (payload, id) => ({
    type: types.GET_HISTORICAL_MEASUREMENTS_SUCCESS,
    payload,
    meta: {
        id
    }
});

export const getHistoricalMeasurementsFailure = (payload, id, monitor) => ({
    type: types.GET_HISTORICAL_MEASUREMENTS_FAILURE,
    payload,
    error: true,
    meta: {
        id,
        monitor
    }
});

// ****************************** routing ******************************

export const changeRoutingContext = (payload) => ({
    type: types.CHANGE_ROUTING_CONTEXT,
    payload
});
