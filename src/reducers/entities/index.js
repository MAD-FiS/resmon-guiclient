import { combineReducers } from 'redux';
import monitors, * as fromMonitors from './monitors';

export default combineReducers({ monitors });

export const getMonitorsArray = (state) => fromMonitors.getArray(state.monitors);
