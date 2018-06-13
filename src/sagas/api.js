import moment from 'moment';
import escapeStringRegexp from 'escape-string-regexp';
import { select, call, put, all } from 'redux-saga/effects';
import { getAuthServer, getToken, getMonitorByHost, getLiveChartByMonitors, getLiveChartLastTime,
    getHistoricalChartsByMonitors, getLiveChartById, getHistoricalChartById } from '../reducers';
import * as actions from '../actions/sync';
import * as api from '../api';
import { getStartTimeForLiveCharts } from '../times';

export function* signUp({ payload }) {
    const server = yield select(getAuthServer);
    try {
        const result = yield call(api.registration, server, payload);
        yield put(actions.signUpSuccess(result));
    }
    catch (error) {
        yield put(actions.signUpFailure(error));
    }
}

export function* signIn({ payload }) {
    const server = yield select(getAuthServer);
    try {
        const result = yield call(api.login, server, payload);
        yield put(actions.signInSuccess(result));
    }
    catch (error) {
        yield put(actions.signInFailure(error));
    }
}

export function* addComplexMetric({ payload, meta }) {
    const token = yield select(getToken);
    const monitor = yield select(getMonitorByHost, meta.host);
    try {
        const result = yield call(api.postComplexMetric, monitor, token, meta.host, payload);
        yield put(actions.addComplexMetricSuccess({ ...payload, ...result }, meta.host));
    }
    catch (error) {
        yield put(actions.addComplexMetricFailure(error, meta.host));
    }
}

export function* removeComplexMetric({ meta }) {
    const token = yield select(getToken);
    const monitor = yield select(getMonitorByHost, meta.host);
    try {
        yield call(api.deleteComplexMetric, monitor, token, meta.host, meta.id);
        yield put(actions.removeComplexMetricSucces(meta.id, meta.host));
    }
    catch (error) {
        yield put(actions.removeComplexMetricFailure(error, meta.host));
    }
}

export function* getHosts({ meta }) {
    const token = yield select(getToken);
    try {
        const result = yield call(api.getHosts, meta.monitor, token);
        yield put(actions.getHostsSuccess(result, meta.monitor));
    }
    catch (error) {
        yield put(actions.getHostsFailure(error, meta.monitor));
    }
}

export function* getLiveChartMeasurementsForSingleMonitor(initialFetch, id, monitor, hosts) {
    const token = yield select(getToken);
    const { metric } = yield select(getLiveChartById, id);
    let start;
    if (!initialFetch) {
        start = yield select(getLiveChartLastTime, id, monitor);
    }
    if (!start) {
        start = yield call(getStartTimeForLiveCharts);
    }
    try {
        const q = `metric_id:${metric},hostname:/(${hosts.map(escapeStringRegexp).join('|')})/`;
        const data = yield call(api.getMeasurements, monitor, token, { start, q });
        return { data };
    }
    catch (error) {
        return error;
    }
}

export function* getLiveChartMeasurements({ meta }) {
    let { measurements, hostsByMonitors } = yield select(getLiveChartByMonitors, meta.id);
    if (meta.initialFetch) {
        measurements = {};
    }
    if (Object.keys(hostsByMonitors).length) {
        const results = yield all(
            Object.entries(hostsByMonitors).reduce((c, [ monitor, hosts ]) => ({
                ...c,
                [monitor]: call(
                    getLiveChartMeasurementsForSingleMonitor,
                    meta.initialFetch,
                    meta.id,
                    monitor,
                    hosts
                )
            }), {})
        );
        for (const monitor of Object.keys(results)) {
            const result = results[monitor];
            if (!result.data) {
                yield put(actions.getLiveMeasurementsFailure(result, meta.id, monitor));
            }
            else {
                for (const measurement of result.data) {
                    if (meta.initialFetch) {
                        measurements[measurement.hostname] = measurement.data;
                    }
                    else {
                        const hostMeas = measurements[measurement.hostname];
                        const start = yield call(getStartTimeForLiveCharts);
                        const startMom = moment(start);
                        let i = 0;
                        while (i < hostMeas.length && startMom.isAfter(hostMeas[i].time)) {
                            ++i;
                        }
                        measurements[measurement.hostname] = [
                            ...hostMeas.slice(i),
                            ...measurement.data
                        ];
                    }
                }
            }
        }
    }
    yield put(actions.getLiveMeasurementsSuccess({ measurements }, meta.id));
}

export function* getHistoricalChartMeasurementsForSingleMonitor(id, monitor, hosts1, hosts2) {
    const token = yield select(getToken);
    const { metric1, metric2, start, end } = yield select(getHistoricalChartById, id);
    try {
        let q = [];
        if (hosts1) {
            q.push(`metric_id:${metric1},hostname:/(${hosts1.map(escapeStringRegexp).join('|')})/`);
        }
        if (hosts2) {
            q.push(`metric_id:${metric2},hostname:/(${hosts2.map(escapeStringRegexp).join('|')})/`);
        }
        q = q.join(';');
        const data = yield call(api.getMeasurements, monitor, token, { start, end, q });
        return { data };
    }
    catch (error) {
        return error;
    }
}

export function* getHistoricalChartMeasurements({ meta }) {
    const { metric2 } = yield select(getHistoricalChartById, meta.id);
    let measurements1 = {};
    let measurements2 = metric2 ? {} : null;
    const hostsByMetricsAndMonitors = yield select(getHistoricalChartsByMonitors, meta.id);
    if (Object.keys(hostsByMetricsAndMonitors).length) {
        const results = yield all(
            Object.entries(hostsByMetricsAndMonitors).reduce((c, [ monitor, { hosts1, hosts2 }]) => ({
                ...c,
                [monitor]: call(
                    getHistoricalChartMeasurementsForSingleMonitor,
                    meta.id,
                    monitor,
                    hosts1,
                    hosts2
                )
            }), {})
        );
        for (const monitor of Object.keys(results)) {
            const result = results[monitor];
            if (!result.data) {
                yield put(actions.getHistoricalMeasurementsFailure(result, meta.id, monitor));
            }
            else {
                for (const measurement of result.data) {
                    if (measurement.metric_id === metric2) {
                        measurements2[measurement.hostname] = measurement.data;
                    }
                    else {
                        measurements1[measurement.hostname] = measurement.data;
                    }
                }
            }
        }
    }
    yield put(actions.getHistoricalMeasurementsSuccess({ measurements1, measurements2 }, meta.id));
}
