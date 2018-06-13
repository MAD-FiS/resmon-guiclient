import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import Historical from './pages/Historical';
import Live from './pages/Live';
import Metrics from './pages/Metrics';
import Monitors from './pages/Monitors';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { getToken } from './reducers';

export const LIVE_ROUTE = '/live';
export const HISTORICAL_ROUTE = '/historical';
export const MONITORS_ROUTE = '/monitors';
export const HOSTS_ROUTE = '/hosts';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';

export const routes = {
    [LIVE_ROUTE]: {
        tokenRequired: true,
        component: Live
    },
    [HISTORICAL_ROUTE]: {
        tokenRequired: true,
        component: Historical
    },
    [MONITORS_ROUTE]: {
        tokenRequired: true,
        component: Monitors
    },
    [HOSTS_ROUTE]: {
        tokenRequired: true,
        component: Metrics
    },
    [LOGIN_ROUTE]: {
        tokenRequired: false,
        component: SignIn
    },
    [REGISTRATION_ROUTE]: {
        tokenRequired: false,
        component: SignUp
    }
};

export const isRouteDefined = route => Boolean(routes[route]);

export const getDefaultRouteByToken = token => token ? LIVE_ROUTE : LOGIN_ROUTE;

export const isTokenRequired = route => routes[route].tokenRequired;

const mapStateToProps = state => ({
    token: getToken(state)
});

const mapDispatchToProps = {};

const wrapWithAuth = tokenRequired => Component => connect(mapStateToProps, mapDispatchToProps)(

    function WithAuth({ token, ...rest }) {
        if (Boolean(tokenRequired) === Boolean(token)) {
            return React.createElement(Component, rest);
        }
        else {
            return null;
        }
    }

);

export const getRoutes = () => (
    <Switch>
        {Object.entries(routes).map(([ path, r ]) => (
            <Route key={path} path={path} component={wrapWithAuth(r.tokenRequired)(r.component)} />
        ))}
        <Route component={NotFound} />
    </Switch>
);
