import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth, * as fromAuth from './auth';
import entities, * as fromEntities from './entities';
import liveCharts from './liveCharts';

export default combineReducers({ auth, liveCharts, entities, router });

export const isAuthTokenSet = (state) => fromAuth.isAuthTokenSet(state.auth);
export const getAuthTokenRequested = (state) => fromAuth.getAuthTokenRequested(state.auth);
export const getAuthToken = (state) => fromAuth.getAuthToken(state.auth);
export const getAuthServer = (state) => fromAuth.getAuthServer(state.auth);

export const getMonitorsArray = (state) => fromEntities.getMonitorsArray(state.entities);
export const getMonitorById = (state, address) => fromEntities.getMonitorById(state.entities, address);
export const getMonitorsAddresses = (state) => fromEntities.getMonitorsAddresses(state.entities);
export const getMonitorsHostsInvalidated = (state) => fromEntities.getMonitorsHostsInvalidated(state.entities);
export const getHostsArray = (state) => fromEntities.getHostsArray(state.entities);
export const getMetricsArray = (state) => fromEntities.getMetricsArray(state.entities);

export const getLocation = (state) => state.router.location;
