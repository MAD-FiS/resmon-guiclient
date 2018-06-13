import { combineReducers } from 'redux';
import * as types from '../actions/types';

export const getAuthServer = state => state.authServer;
export const getToken = state => state.token;
export const getTokenRequested = state => state.tokenRequested;

const token = (state = null, action) => {
    switch (action.type) {
        case types.SIGN_IN_SUCCESS:
        case types.SIGN_UP_SUCCESS:
            return action.payload.access_token;
        case types.REMOVE_TOKEN:
            return null;
        default:
            return state;
    }
};

const tokenRequested = (state = false, action) => {
    switch (action.type) {
        case types.SIGN_IN_REQUEST:
        case types.SIGN_UP_REQUEST:
            return true;
        case types.SIGN_IN_SUCCESS:
        case types.SIGN_UP_SUCCESS:
        case types.SIGN_IN_FAILURE:
        case types.SIGN_UP_FAILURE:
            return false;
        default:
            return state;
    }
};

const authServer = (state = DEFAULT_AUTH_SERVER, action) => {
    switch (action.type) {
        case types.CHANGE_AUTH_SERVER:
            return action.payload.address || DEFAULT_AUTH_SERVER;
        default:
            return state;
    }
};

export default combineReducers({ token, tokenRequested, authServer });
