import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createStore from './createStore';
import { getSavedState } from './localStorage';
import AppLayout from './containers/AppLayout';
import { getRoutes } from './routes';

const { store, history } = createStore(getSavedState());

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppLayout>
                {getRoutes()}
            </AppLayout>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
