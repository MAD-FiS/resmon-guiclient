import { all, fork, select, put, cancel, takeEvery, takeLatest, take, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'connected-react-router';
import * as types from '../actions/types';
import * as actions from '../actions/sync';
import * as apiSagas from './api';
import * as storageSagas from './localStorage';
import { getToken, getPathname, getLiveChartsAllIds, getMonitorsAddresses } from '../reducers';
import { getDefaultRouteByToken, isRouteDefined, isTokenRequired, LIVE_ROUTE } from '../routes';
import Notification from '../components/Notification';

function* dealWithNewLocation(pathname) {
    const isTokenSet = Boolean(yield select(getToken));
    if (pathname === '/') {
        const newPathname = yield call(getDefaultRouteByToken, isTokenSet);
        yield put(push(newPathname));
    }
    else if (yield call(isRouteDefined, pathname)) {
        const tokenRequired = yield call(isTokenRequired, pathname);
        if (tokenRequired === isTokenSet) {
            yield put(actions.changeRoutingContext({ pathname }));
        }
        else {
            const newPathname = yield call(getDefaultRouteByToken, isTokenSet);
            yield put(push(newPathname));
        }
    }
    else {
        yield put(actions.changeRoutingContext({ pathname }));
    }
}

function* watchForLocationChange() {
    yield delay(0);
    const startLocation = yield select(getPathname);
    let task = yield fork(dealWithNewLocation, startLocation);
    while (true) {
        const action = yield take([
            '@@router/LOCATION_CHANGE',
            types.SIGN_IN_SUCCESS,
            types.SIGN_UP_SUCCESS,
            types.REMOVE_TOKEN
        ]);
        yield cancel(task);
        const newLocation = action.type === '@@router/LOCATION_CHANGE' ? action.payload.location.pathname : '/';
        task = yield fork(dealWithNewLocation, newLocation);
    }
}

function* keepLiveChartRefreshing(id) {
    yield put(actions.getLiveMeasurementsRequest(id, true));
    while(true) {
        yield all([
            take(types.GET_LIVE_MEASUREMENTS_SUCCESS),
            delay(1000 * 15)
        ]);
        yield put(actions.getLiveMeasurementsRequest(id, false));
    }
}

function* conductLiveChartsUpdates() {
    const liveCharts = yield select(getLiveChartsAllIds);
    const tasks = {};
    for (const id of liveCharts) {
        tasks[id] = yield fork(keepLiveChartRefreshing, id);
    }
    while (true) {
        const action = yield take([
            types.CHANGE_ROUTING_CONTEXT,
            types.ADD_LIVE_CHART,
            types.REMOVE_LIVE_CHART,
            types.SET_LIVE_CHART_METRIC,
            types.ADD_LIVE_CHART_HOST,
            types.REMOVE_LIVE_CHART_HOST
        ]);
        if (action.type === types.CHANGE_ROUTING_CONTEXT && action.payload.pathname !== LIVE_ROUTE) {
            yield cancel();
        }
        if (
            action.type === types.REMOVE_LIVE_CHART
            || action.type === types.SET_LIVE_CHART_METRIC
            || action.type === types.ADD_LIVE_CHART_HOST
            || action.type === types.REMOVE_LIVE_CHART_HOST
        ) {
            yield cancel(tasks[action.meta.id]);
        }
        if (action.type === types.ADD_LIVE_CHART) {
            tasks[action.payload.id] = yield fork(keepLiveChartRefreshing, action.payload.id);
        }
        if (
            action.type === types.SET_LIVE_CHART_METRIC
            || action.type === types.ADD_LIVE_CHART_HOST
            || action.type === types.REMOVE_LIVE_CHART_HOST
        ) {
            tasks[action.meta.id] = yield fork(keepLiveChartRefreshing, action.meta.id);
        }
    }
}

function* watchForLiveChartContext() {
    let task;
    const pathname = yield select(getPathname);
    if (pathname === LIVE_ROUTE) {
        task = yield fork(conductLiveChartsUpdates);
    }
    while (true) {
        const { payload } = yield take(types.CHANGE_ROUTING_CONTEXT);
        if (payload.pathname === LIVE_ROUTE) {
            if (task) {
                cancel(task);
            }
            task = yield fork(conductLiveChartsUpdates);
        }
    }
}

function* loginWatcher() {
    yield take(types.CHANGE_ROUTING_CONTEXT);
    const token = yield select(getToken);
    let worker;
    if (token) {
        worker = yield fork(authSiteWatcher);
        yield call(Notification.success, 'Sesja została przywrócona');
    }
    while (true) {
        const { type } = yield take([
            types.SIGN_IN_SUCCESS,
            types.SIGN_UP_SUCCESS,
            types.REMOVE_TOKEN
        ]);
        if (worker) {
            yield cancel(worker);
        }
        if (type !== types.REMOVE_TOKEN) {
            worker = yield fork(authSiteWatcher);
            yield call(Notification.success, 'Zostałeś zalogowany pomyślnie');
        }
        else {
            yield call(Notification.success, 'Zostałeś wylogowany pomyślnie');
        }
    }
}

function* getAllHosts() {
    const monitors = yield select(getMonitorsAddresses);
    yield all(monitors.map(monitor => put(actions.getHostsRequest(monitor))));
}

function* watchForHistoricalChartUpdates() {
    let workers = {};
    while (true) {
        const action = yield take([
            types.SET_HISTORICAL_CHART_RANGE,
            types.SET_HISTORICAL_CHART_METRIC1,
            types.SET_HISTORICAL_CHART_METRIC2,
            types.ADD_HISTORICAL_CHART_HOST1,
            types.ADD_HISTORICAL_CHART_HOST2,
            types.REMOVE_HISTORICAL_CHART_HOST1,
            types.REMOVE_HISTORICAL_CHART_HOST2,
            types.REMOVE_HISTORICAL_CHART
        ]);
        if (workers[action.meta.id]) {
            yield cancel(action.meta.id);
        }
        if (action.type !== types.REMOVE_HISTORICAL_CHART) {
            yield put(actions.getHistoricalMeasurementsRequest(action.meta.id));
        }
    }
}

function* authSiteWatcher() {
    yield all([
        fork(watchForLiveChartContext),
        fork(watchForHistoricalChartUpdates),
        takeEvery(types.GET_HOSTS, getAllHosts),
        takeEvery(types.ADD_COMPLEX_METRIC_REQUEST, apiSagas.addComplexMetric),
        takeEvery(types.REMOVE_COMPLEX_METRIC_REQUEST, apiSagas.removeComplexMetric),
        takeEvery(types.GET_HOSTS_REQUEST, apiSagas.getHosts),
        takeEvery(types.GET_LIVE_MEASUREMENTS_REQUEST, apiSagas.getLiveChartMeasurements),
        takeEvery(types.GET_HISTORICAL_MEASUREMENTS_REQUEST, apiSagas.getHistoricalChartMeasurements),
        takeLatest([
            types.ADD_MONITOR,
            types.SET_MONITOR_ADDRESS,
            types.SET_MONITOR_DESCRIPTION,
            types.REMOVE_MONITOR
        ], storageSagas.monitorsSaver),
    ]);
    yield put(actions.getHosts());
}

function* errorThrower() {
    while (true) {
        const action = yield take('*');
        if (action.error) {
            yield call(Notification.error, action.payload.message + (status ? ' (Kod ' + status + ')' : ''));
        }
    }
}

export default function* root() {
    yield all([
        takeEvery(types.SIGN_UP_REQUEST, apiSagas.signUp),
        takeEvery(types.SIGN_IN_REQUEST, apiSagas.signIn),
        takeLatest(types.SIGN_IN_REQUEST, storageSagas.tokenSaver),
        takeLatest(types.REMOVE_TOKEN, storageSagas.tokenEraser),
        takeLatest(types.CHANGE_AUTH_SERVER, storageSagas.authServerSaver),
        fork(watchForLocationChange),
        fork(loginWatcher),
        fork(errorThrower)
    ]);
}
