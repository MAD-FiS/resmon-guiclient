import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import AppLayout from './containers/AppLayout';
import initStore from './initStore';

import Home from './pages/Home';
import Live from './pages/Live';
import Historical from './pages/Historical';
import Metrics from './pages/Metrics';
import Monitors from './pages/Monitors';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

const { store, history } = initStore();

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppLayout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/live" component={Live} />
                    <Route path="/historical" component={Historical} />
                    <Route path="/metrics" component={Metrics} />
                    <Route path="/monitors" component={Monitors} />
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route component={NotFound} />
                </Switch>
            </AppLayout>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
