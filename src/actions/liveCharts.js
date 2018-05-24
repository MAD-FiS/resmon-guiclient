import guid from '../utils/guid';
import * as api from '../api';
import { getMetricsAll, getAuthToken } from '../reducers';

export const ADD_LIVE_CHART = 'ADD_LIVE_CHART';
export const REMOVE_LIVE_CHART = 'REMOVE_LIVE_CHART';
export const CHANGE_METRIC_LIVE_CHART = 'CHANGE_METRIC_LIVE_CHART';
export const ADD_HOST_LIVE_CHART = 'ADD_HOST_LIVE_CHART';
export const REMOVE_HOST_LIVE_CHART = 'REMOVE_HOST_LIVE_CHART';

export const addLiveChart = (metric) => ({
    type: ADD_LIVE_CHART,
    metric,
    id: guid()
});

export const removeLiveChart = (id) => ({
    type: REMOVE_LIVE_CHART,
    id
});

export const changeMetricLiveChart = (id, metric) => ({
    type: CHANGE_METRIC_LIVE_CHART,
    id,
    metric
});

export const addHostLiveChart = (id, host) => ({
    type: ADD_HOST_LIVE_CHART,
    id,
    host
});

export const removeHostLiveChart = (id, host) => ({
    type: REMOVE_HOST_LIVE_CHART,
    id,
    host
});

export const getData = (start, end, metric, hosts) => (dispatch, getState) => {
    const state = getState();
    const token = getAuthToken(state);
    const allMetricHosts = getMetricsAll(state)[metric].hosts;
    const filteredHosts = allMetricHosts.filter(v => hosts.indexOf(v.host) !== -1);
    const grouped = filteredHosts.reduce((c, { host, monitor }) => ({
        ...c,
        [monitor]: [
            ...(c[monitor] || []),
            host
        ]
    }), {});
    return Promise.all(Object.entries(grouped).map(([ monitor, monitorHosts ]) => (
        api.getMeasurements(monitor, token, { [metric]: monitorHosts }, start, end)
    )));
};
