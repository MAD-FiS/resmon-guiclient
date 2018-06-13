import { take, call, select } from 'redux-saga/effects';
import * as types from '../actions/types';
import { convertMonitorsFromObj } from '../reducers';
import * as storage from '../localStorage';

export function* tokenSaver({ payload }) {
    if (payload.remember) {
        const { resultPayload } = yield take(types.SIGN_IN_SUCCESS);
        yield call(storage.saveToken, resultPayload.access_token);
    }
}

export function* tokenEraser() {
    yield call(storage.clearToken);
}

export function* monitorsSaver() {
    const monitors = select(convertMonitorsFromObj);
    yield call(storage.updateMonitors, monitors);
}

export function* authServerSaver({ payload }) {
    yield call(storage.updateAuthServer, payload.address);
}
