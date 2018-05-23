import { push } from 'react-router-redux';
import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT, restoreSession, signOut } from '../actions/auth';
import { getLocation, isAuthTokenSet } from '../reducers';
import { routesAndAuthRequired } from '../routes';

export default store => next => action => {

    const isLocationChange = action.type === '@@router/LOCATION_CHANGE';
    const state = store.getState();

    if (isLocationChange || action.type === SIGN_IN_SUCCESS || action.type === SIGN_UP_SUCCESS || action.type === SIGN_OUT) {

        const nextLocation = isLocationChange ? action.payload : getLocation(state);
        const routeAuthRequired = (routesAndAuthRequired[nextLocation.pathname] || {}).auth;

        const authorized = isLocationChange ? isAuthTokenSet(state) : (action.type === SIGN_IN_SUCCESS || action.type === SIGN_UP_SUCCESS);

        if (routeAuthRequired === false && authorized === true) {
            if (isLocationChange) {
                // jak ktos przeroutuje sie np. w /login a juz jest zalogowany
                action.payload.pathname = '/';
                return next(action);
            }
            else {
                // normalne logowanie sie
                const result = next(action);
                store.dispatch(push('/'));
                return result;
            }
        }

        else if (routeAuthRequired === true && authorized === false) {
            
            if (isLocationChange) {
                // jak ktos chce routowac tam gdzie nie powinien - przywracanie sesji itd
                store.dispatch(restoreSession());
                const restored = isAuthTokenSet(store.getState());
                if (!restored) {
                    action.payload.pathname = '/';
                }
                return next(action);
            }
            else {
                // normalne wylogowanie sie
                const result = next(action);
                store.dispatch(push('/'));
                return result;
            }
        }

    }

    else if (action.code === 401 && isAuthTokenSet(state)) {
        store.dispatch(signOut());
    }

    return next(action);

}