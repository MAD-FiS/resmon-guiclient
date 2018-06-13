import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import AppLayout from '../index.js';
import initStore from '../../../createStore';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const { store, history } = initStore();
    ReactDOM.render((
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppLayout>
                    <p>Junk</p>
                </AppLayout>
            </ConnectedRouter>
        </Provider>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
});
