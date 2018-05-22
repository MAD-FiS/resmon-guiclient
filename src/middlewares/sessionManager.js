import { push } from 'react-router-redux';
import { SIGN_IN_FAILURE, RESTORE_SESSION, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT } from '../actions/auth';
import { getAuthCredentials, getAuthServer } from '../reducers';
import * as api from '../api';

const STORAGE_CREDENTIALS_KEY = 'CREDENTIALS';

export default store => next => action => {

    if (action.type === SIGN_IN_SUCCESS || action.type === SIGN_UP_SUCCESS) {
        const { remember, ...userData } = action.credentials;
        if (remember) {
            localStorage.setItem(STORAGE_CREDENTIALS_KEY, JSON.stringify(userData));
        }
        else {
            localStorage.removeItem(STORAGE_CREDENTIALS_KEY);
        }
    }

    if (action.type === SIGN_OUT) {
        localStorage.removeItem(STORAGE_CREDENTIALS_KEY);
    }

    if (
        action.type === RESTORE_SESSION ||
        (action.type !== SIGN_IN_FAILURE && action.code === 401)
    ) {
        const state = store.getState();
        const stateCredentials = getAuthCredentials(state);
        
        let credentials = stateCredentials;
        if (!credentials) {
            const fromStorage = localStorage.getItem(STORAGE_CREDENTIALS_KEY);
            if (fromStorage) {
                try {
                    credentials = JSON.parse(fromStorage);
                }
                catch (error) {}
            }
        }

        if (credentials) {

            const authServer = getAuthServer(state);
            api.signIn(authServer, credentials).then(
                (token) => {
                    store.dispatch({ type: SIGN_IN_SUCCESS, token, credentials: { ...credentials, remember: true }})
                },
                ({ code, error }) => {
                    localStorage.removeItem(STORAGE_CREDENTIALS_KEY);
                    store.dispatch({ type: SIGN_IN_FAILURE, code, error });
                    if (stateCredentials) {
                        store.dispatch({ type: SIGN_OUT });
                    }
                }
            );

        }

        else {
            store.dispatch(push('/'));
        }

    }

    if (action.type !== RESTORE_SESSION) {
        return next(action);
    }

}