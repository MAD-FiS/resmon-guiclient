import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import AppLayout from '../index.js';
import initStore from '../../../initStore';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const { store, history } = initStore({ router: { location: { pathname: 'test-pathname' }}});
    ReactDOM.render((
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppLayout />
            </ConnectedRouter>
        </Provider>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
});
