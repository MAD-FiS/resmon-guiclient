import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth, * as fromAuth from './auth';

export default combineReducers({ auth, router });

export const isAuthTokenSet = (state) => fromAuth.isAuthTokenSet(state.auth);
export const getAuthCredentials = (state) => fromAuth.getAuthCredentials(state.auth);
export const getAuthTokenRequested = (state) => fromAuth.getAuthTokenRequested(state.auth);
export const getAuthServer = (state) => fromAuth.getAuthServer(state.auth);

export const getLocation = (state) => state.router.location;
