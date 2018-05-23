import React from 'react';
import { Route } from 'react-router';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Live from './pages/Live';
import Historical from './pages/Historical';
import Metrics from './pages/Metrics';
import Monitors from './pages/Monitors';

export const routesAndAuthRequired = {
    '/live': {
        auth: true,
        component: Live
    },
    '/historical': {
        auth: true,
        component: Historical
    },
    '/metrics': {
        auth: true,
        component: Metrics
    },
    '/monitors': {
        auth: true,
        component: Monitors
    },
    '/sign-in': {
        auth: false,
        component: SignIn
    },
    '/sign-up': {
        auth: false,
        component: SignUp
    }
};

export const routes = Object.entries(routesAndAuthRequired).map(([ path, obj ]) => (
    <Route key={path} path={path} component={obj.component} />
));
