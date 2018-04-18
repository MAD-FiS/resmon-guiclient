import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';

export default combineReducers({ auth, router });

export const getAuth = (state) => state.auth;

export const getLocation = (state) => state.router.location;
