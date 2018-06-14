import * as types from '../actions/types';

export const getMonitorByHost = (state, host) => state[host] ? state[host].monitor : null;
export const getHostsArray = state => Object.values(state).map(h => ({ ...h, metrics: Object.values(h.metrics) }));

export const getMetricsAll = state => Array.from(Object.values(state).reduce((set, h) => {
    Object.keys(h.metrics).forEach(m => set.add(m));
    return set;
}, new Set()));

export const getMetrics = state => {
    const built = {};
    for (const host of Object.values(state)) {
        for (const metric of Object.values(host.metrics)) {
            if (!built[metric.id]) {
                built[metric.id] = {};
            }
            built[metric.id][host.hostname] = metric;
        }
    }
    return built;
};

const extractHosts = (state, monitor) => Object.entries(state)
    .reduce(
        (c, [ key, obj ]) => {
            const type = obj.monitor === monitor ? 'found' : 'rest';
            return {
                ...c,
                [type]: {
                    ...c[type],
                    [key]: obj
                }
            };
        },
        {
            found: {},
            rest: {}
        }
    );

const setMonitor = (state, monitor) => Object.entries(state)
    .map(([ key, obj ]) => [ key, { ...obj, monitor } ])
    .reduce((c, [ key, obj ]) => ({ ...c, [key]: obj }), {});

const convertMetric = state => {
    const { hosts, ...rest } = state; // eslint-disable-line no-unused-vars
    return rest;
};

const normalize = state => state.reduce((c, obj) => ({
    ...c,
    [obj.hostname]: {
        ...obj,
        metrics: obj.metrics.reduce((d, metric) => ({
            ...d,
            [metric.id]: convertMetric(metric)
        }), {}),
        metricsInvalidated: false
    }
}), {});

const host = (state, action) => {
    switch (action.type) {
        case types.ADD_COMPLEX_METRIC_REQUEST:
        case types.REMOVE_COMPLEX_METRIC_REQUEST:
            return {
                ...state,
                metricsInvalidated: true
            };
        case types.ADD_COMPLEX_METRIC_SUCCESS:
            return {
                ...state,
                metricsInvalidated: false,
                metrics: {
                    ...state.metrics,
                    [action.payload.id]: {
                        ...action.payload,
                        removable: true
                    }
                }
            };
        case types.ADD_COMPLEX_METRIC_FAILURE:
        case types.REMOVE_COMPLEX_METRIC_FAILURE:
            return {
                ...state,
                metricsInvalidated: false
            };
        case types.REMOVE_COMPLEX_METRIC_SUCCESS: {
            const { [action.meta.id]: metricToRemove, ...metricsToLeave } = state.metrics; // eslint-disable-line no-unused-vars
            return {
                ...state,
                metricsInvalidated: false,
                metrics: metricsToLeave
            };
        }
        default:
            return state;
    }
};

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_HOSTS_SUCCESS:
            return {
                ...extractHosts(state, action.meta.monitor).rest,
                ...setMonitor(normalize(action.payload), action.meta.monitor)
            };
        case types.SET_MONITOR_ADDRESS: {
            const hostsExtracted = extractHosts(state, action.meta.monitor);
            return {
                ...hostsExtracted.rest,
                ...setMonitor(hostsExtracted.found, action.payload.address)
            };
        }
        case types.REMOVE_MONITOR:
            return extractHosts(state, action.meta.monitor).rest;
        case types.REMOVE_TOKEN:
            return {};
        case types.ADD_COMPLEX_METRIC_REQUEST:
        case types.ADD_COMPLEX_METRIC_SUCCESS:
        case types.ADD_COMPLEX_METRIC_FAILURE:
        case types.REMOVE_COMPLEX_METRIC_REQUEST:
        case types.REMOVE_COMPLEX_METRIC_SUCCESS:
        case types.REMOVE_COMPLEX_METRIC_FAILURE: {
            const { [action.meta.host]: target, ...rest } = state;
            return {
                ...rest,
                [action.meta.host]: host(target, action)
            };
        }
        default:
            return state;
    }
};
