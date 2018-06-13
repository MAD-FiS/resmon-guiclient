import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default (initialState) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMiddleware = createSagaMiddleware();
    const history = createBrowserHistory();
    const store = createStore(
        connectRouter(history)(rootReducer),
        initialState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware
            )
        )
    );
    sagaMiddleware.run(rootSaga);
    return { store, history };
};
