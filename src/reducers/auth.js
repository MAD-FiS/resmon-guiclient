import { combineReducers } from 'redux';
import { getSavedAuthServer } from '../middlewares/globalsStorage';
import {
    SIGN_IN_REQUEST,
    SIGN_IN_FAILURE,
    SIGN_IN_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
    SIGN_OUT,
    CHANGE_AUTH_SERVER,
    RESTORE_SESSION
} from '../actions/auth';

const defaultAuthServer = getSavedAuthServer();

const token = (state = null, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return action.payload.token;
        case RESTORE_SESSION:
            return action.token;
        case SIGN_OUT:
            return null;
        default:
            return state;
    }
}

const tokenRequested = (state = false, action) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
        case SIGN_UP_REQUEST:
            return true;
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
        case SIGN_IN_FAILURE:
        case SIGN_UP_FAILURE:
            return false;
        default:
            return state;
    }
};

const server = (state = defaultAuthServer, action) => {
    switch (action.type) {
        case CHANGE_AUTH_SERVER:
            return action.server || defaultAuthServer;
        default:
            return state;
    }
};

export default combineReducers({ token, tokenRequested, server });

export const isAuthTokenSet = (state) => Boolean(state.token);
export const getAuthTokenRequested = (state) => state.tokenRequested;
export const getAuthServer = (state) => state.server;
export const getAuthToken = (state) => state.token;
