import { isAuthTokenSet } from '../reducers';

/**
 * Catches home route and replaces it with default route for with-token or without-token state.
 * In result, you don't need to worry where to route after login / logout / etc.. - just
 * dispatch react-router-redux-ish push('/'). And OFC home routing could be accomplished in the same maneer.
 */
export default store => next => action => {
    if (action.type === '@@router/LOCATION_CHANGE' && action.payload.pathname === '/') {
        if (isAuthTokenSet(store.getState())) {
            window.history.replaceState(null, document.title, '/live');
            action.payload.pathname = '/live';
        }
        else {
            window.history.replaceState(null, document.title, '/sign-in');
            action.payload.pathname = '/sign-in';
        }
    }
    return next(action);
}
