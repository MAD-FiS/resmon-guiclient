import { combineReducers } from 'redux';
import { denormalize } from 'normalizr';
import * as schema from '../../schema';
import monitors, * as fromMonitors from './monitors';
import hosts from './hosts';
import metrics, * as fromMetrics from './metrics';

export default combineReducers({ monitors, hosts, metrics });

export const getMonitorsArray = (state) => fromMonitors.getArray(state.monitors);
export const getMonitorById = (state, address) => fromMonitors.getById(state.monitors, address);
export const getMonitorsAddresses = (state) => fromMonitors.getAddresses(state.monitors);
export const getMonitorsHostsInvalidated = (state) => fromMonitors.getHostsInvalidated(state.monitors);

export const getHostsArray = (state) => denormalize(Object.keys(state.hosts), [schema.host], state);

export const getMetricsArray = (state) => fromMetrics.getArray(state.metrics);
export const getMetricsAll = (state) => fromMetrics.getAll(state.metrics);
