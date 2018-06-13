// ****************************** auth ******************************

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
// payload: { username, password, remember }

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
// payload: { access_token }

export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
// payload: Error(...), error: true

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
// payload: { username, password }

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
// payload: { access_token }

export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
// payload: Error(...), error: true

export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const CHANGE_AUTH_SERVER = 'CHANGE_AUTH_SERVER';
// payload: { address }

// ****************************** monitors ******************************

export const ADD_MONITOR = 'ADD_MONITOR';
// payload: { address, description }

export const SET_MONITOR_ADDRESS = 'SET_MONITOR_ADDRESS';
// payload: { address }, meta: { monitor }

export const SET_MONITOR_DESCRIPTION = 'SET_MONITOR_DESCRIPTION';
// payload: { description }, meta: { monitor }

export const REMOVE_MONITOR = 'REMOVE_MONITOR';
// meta: { monitor }

export const GET_HOSTS_REQUEST = 'GET_HOSTS_REQUEST';
// meta: { monitor }

export const GET_HOSTS_SUCCESS = 'GET_HOSTS_SUCCESS';
// payload: [...], meta: { monitor }

export const GET_HOSTS_FAILURE = 'GET_HOSTS_FAILURE';
// payload: Error(...), error: true, meta: { monitor }

// ****************************** complex metrics ******************************

export const ADD_COMPLEX_METRIC_REQUEST = 'ADD_COMPLEX_METRIC_REQUEST';
// payload: { description, parent_id, moving_window_duration, interval }, meta: { host }

export const ADD_COMPLEX_METRIC_SUCCESS = 'ADD_COMPLEX_METRIC_SUCCESS';
// payload: { id, unit, description, parent_id, moving_window_duration, interval }, meta: { host }

export const ADD_COMPLEX_METRIC_FAILURE = 'ADD_COMPLEX_METRIC_FAILURE';
// payload: Error(...), error: true, meta: { host }

export const REMOVE_COMPLEX_METRIC_REQUEST = 'REMOVE_COMPLEX_METRIC_REQUEST';
// meta: { id, host }

export const REMOVE_COMPLEX_METRIC_SUCCESS = 'REMOVE_COMPLEX_METRIC_SUCCESS';
// meta: { id, host }

export const REMOVE_COMPLEX_METRIC_FAILURE = 'REMOVE_COMPLEX_METRIC_FAILURE';
// payload: Error(...), error: true, meta: { host }

// ****************************** live chart ******************************

export const ADD_LIVE_CHART = 'ADD_LIVE_CHART';
// payload: { id, metric }

export const REMOVE_LIVE_CHART = 'REMOVE_LIVE_CHART';
// meta: { id }

export const SET_LIVE_CHART_METRIC = 'SET_LIVE_CHART_METRIC';
// payload: { metric }, meta: { id }

export const ADD_LIVE_CHART_HOST = 'ADD_LIVE_CHART_HOST';
// payload: { host }, meta: { id }

export const REMOVE_LIVE_CHART_HOST = 'REMOVE_LIVE_CHART_HOST';
// meta: { id, host }

export const GET_LIVE_MEASUREMENTS_REQUEST = 'GET_LIVE_MEASUREMENTS_REQUEST';
// meta: { id, initialFetch }

export const GET_LIVE_MEASUREMENTS_SUCCESS = 'GET_LIVE_MEASUREMENTS_SUCCESS';
// payload: { measurements: {...} }, meta: { id }

export const GET_LIVE_MEASUREMENTS_FAILURE = 'GET_LIVE_MEASUREMENTS_FAILURE';
// payload: Error(...), error: true, meta: { id, monitor }

// ****************************** historical chart ******************************

export const ADD_HISTORICAL_CHART = 'ADD_HISTORICAL_CHART';
// payload: { id, metric }

export const REMOVE_HISTORICAL_CHART = 'REMOVE_HISTORICAL_CHART';
// meta: { id }

export const SET_HISTORICAL_CHART_RANGE = 'SET_HISTORICAL_CHART_RANGE';
// payload: { start, end }, meta: { id }

export const SET_HISTORICAL_CHART_METRIC1 = 'SET_HISTORICAL_CHART_METRIC1';
// payload: { metric }, meta: { id }

export const SET_HISTORICAL_CHART_METRIC2 = 'SET_HISTORICAL_CHART_METRIC2';
// payload: { metric }, meta: { id }

export const ADD_HISTORICAL_CHART_HOST1 = 'ADD_HISTORICAL_CHART_HOST1';
// payload: { host }, meta: { id }

export const ADD_HISTORICAL_CHART_HOST2 = 'ADD_HISTORICAL_CHART_HOST2';
// payload: { host }, meta: { id }

export const REMOVE_HISTORICAL_CHART_HOST1 = 'REMOVE_HISTORICAL_CHART_HOST1';
// meta: { id, host }

export const REMOVE_HISTORICAL_CHART_HOST2 = 'REMOVE_HISTORICAL_CHART_HOST2';
// meta: { id, host }

export const GET_HISTORICAL_MEASUREMENTS_REQUEST = 'GET_HISTORICAL_MEASUREMENTS_REQUEST';
// meta: { id }

export const GET_HISTORICAL_MEASUREMENTS_SUCCESS = 'GET_HISTORICAL_MEASUREMENTS_SUCCESS';
// payload: { measurements1: {...}, measurements2: {...} }, meta: { id }

export const GET_HISTORICAL_MEASUREMENTS_FAILURE = 'GET_HISTORICAL_MEASUREMENTS_FAILURE';
// payload: Error(...), error: true, meta: { id, monitor }

// ****************************** routing ******************************

export const CHANGE_ROUTING_CONTEXT = 'CHANGE_ROUTING_CONTEXT';
// payload: { pathname }
