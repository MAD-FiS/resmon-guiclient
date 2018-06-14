import moment from 'moment';
import { combineReducers } from 'redux';
import auth, * as fromAuth from './auth';
import monitors, * as fromMonitors from './monitors';
import hosts, * as fromHosts from './hosts';
import liveCharts, * as fromLiveCharts from './liveCharts';
import historicalCharts, * as fromHistoricalCharts from './historicalCharts';

export const getAuthServer = state => fromAuth.getAuthServer(state.auth);
export const getToken = state => fromAuth.getToken(state.auth);
export const getTokenRequested = state => fromAuth.getTokenRequested(state.auth);

export const convertMonitorsFromObj = state => fromMonitors.convertMonitorsFromObj(state.monitors);
export const getMonitorsAddresses = state => fromMonitors.getMonitorsAddresses(state.monitors);
export const getMonitorsArray = state => fromMonitors.getMonitorsArray(state.monitors);
export const getMonitorsHostsInvalidated = state => fromMonitors.getMonitorsHostsInvalidated(state.monitors);

export const getMonitorByHost = (state, host) => fromHosts.getMonitorByHost(state.hosts, host);
export const getHostsArray = state => fromHosts.getHostsArray(state.hosts);
export const getMetricsAll = state => fromHosts.getMetricsAll(state.hosts);
export const getMetrics = state => fromHosts.getMetrics(state.hosts);

export const getLiveChartById = (state, id) => fromLiveCharts.getLiveChartById(state.liveCharts, id);
export const getLiveChartsAllIds = state => fromLiveCharts.getLiveChartsAllIds(state.liveCharts);
export const getLiveChartsArray = state => fromLiveCharts.getLiveChartsArray(state.liveCharts);

export const getHistoricalChartById = (state, id) => fromHistoricalCharts.getHistoricalChartById(state.historicalCharts, id);
export const getHistoricalChartsArray = state => fromHistoricalCharts.getHistoricalChartsArray(state.historicalCharts);

export const getPathname = state => state.router.location.pathname;
export const getLocation = state => state.router.location;

export const getLiveChartByMonitors = (state, id) => {
    const chart = getLiveChartById(state, id);
    const hostsByMonitors = {};
    for (const host of chart.hosts) {
        const monitor = getMonitorByHost(state, host);
        if (monitor) {
            if (!hostsByMonitors[monitor]) {
                hostsByMonitors[monitor] = [];
            }
            hostsByMonitors[monitor].push(host);
        }
    }
    return {
        measurements: chart.measurements,
        hostsByMonitors
    };
};

export const getHistoricalChartsByMonitors = (state, id) => {
    const chart = getHistoricalChartById(state, id);
    const hostsByMetricsAndMonitors = {};
    for (const host of chart.hosts1) {
        const monitor = getMonitorByHost(state, host);
        if (!hostsByMetricsAndMonitors[monitor]) {
            hostsByMetricsAndMonitors[monitor] = { hosts1: [] };
        }
        hostsByMetricsAndMonitors[monitor].hosts1.push(host);
    }
    if (chart.metric2) {
        for (const host of chart.hosts2) {
            const monitor = getMonitorByHost(state, host);
            if (!hostsByMetricsAndMonitors[monitor]) {
                hostsByMetricsAndMonitors[monitor] = { hosts2: [] };
            }
            else if (!hostsByMetricsAndMonitors[monitor].hosts2) {
                hostsByMetricsAndMonitors[monitor].hosts2 = [];
            }
            hostsByMetricsAndMonitors[monitor].hosts2.push(host);
        }
    }
    return hostsByMetricsAndMonitors;
};

export const getLiveChartLastTime = (state, id, monitor) => {
    const chart = getLiveChartById(state, id);
    const monitorHosts = Object.values(chart.hosts).filter(host => state.hosts[host].monitor === monitor);
    return monitorHosts.reduce((c, host) => {
        const data = chart.measurements[host];
        if (!data || !data.length) {
            return c;
        }
        const lastPoint = data.slice(-1).pop();
        return c && moment(c).isAfter(lastPoint.time) ? c : lastPoint.time;
    }, null);
};

export default combineReducers({ auth, monitors, hosts, liveCharts, historicalCharts });
