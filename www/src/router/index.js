import React from 'react';
import {signOutUser} from '../actions';
import App from '../components/app/App';
import StaticApp from '../components/static/StaticApp';
import Home from '../containers/app/Home';
import StaticHome from '../containers/static/StaticHome';
import Signup from '../containers/static/Signup';
import Login from '../containers/static/Login';
import Favorites from '../containers/app/Favorites';
import {RequireAuth, RequireNotAuth, IifAuth} from '../containers/special/RequireAuth';

import EditProfile from '../containers/app/EditProfile';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import store from '../store';

const history = syncHistoryWithStore(browserHistory, store);

const router = (
    <Router history={history}>
        <Route path="/" component={IifAuth(App, StaticApp)}>
            <IndexRoute component={IifAuth(Home, StaticHome)}/>
            <Route path="signup" component={RequireNotAuth(Signup)}/>
            <Route path="login" component={RequireNotAuth(Login)}/>
            <Route path="logout" onEnter={() => signOutUser()}/>
            <Route path="favorites" component={RequireAuth(Favorites)}/>
            <Route path="editprofile" component={RequireAuth(EditProfile)}/>
        </Route>
    </Router>
);

export default router;
