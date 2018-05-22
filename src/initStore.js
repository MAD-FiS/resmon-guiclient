import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';

import home from './middlewares/home';
import notifications from './middlewares/notifications';
import sessionManager from './middlewares/sessionManager';
import routesChecker from './middlewares/routesChecker';
import globalsStorage from './middlewares/globalsStorage';

export default (initialState) => {
    const history = createHistory();
    const routerMid = routerMiddleware(history);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return {
        store: createStore(
            reducer,
            initialState,
            composeEnhancers(
                applyMiddleware(home, sessionManager, routesChecker, globalsStorage, notifications, reduxThunk, routerMid)
            )
        ),
        history
    };
}
