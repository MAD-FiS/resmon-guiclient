import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';

export default (initialState) => {
    const history = createHistory();
    const routerMid = routerMiddleware(history);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return {
        store: createStore(
            reducer,
            initialState,
            composeEnhancers(
                applyMiddleware(reduxThunk, routerMid)
            )
        ),
        history
    };
}
