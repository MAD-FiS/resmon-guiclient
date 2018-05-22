import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import AppLayout from './containers/AppLayout';
import initStore from './initStore';
import { routes } from './routes';
import NotFound from './pages/NotFound';

const { store, history } = initStore();

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppLayout>
                <Switch>
                    {routes}
                    <Route component={NotFound} />
                </Switch>
            </AppLayout>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
