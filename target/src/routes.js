import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './components/Admin';
import Genre from './components/Genre';
import Home from './components/Home';
import List from './components/List';
import Login from './containers/LoginPage';
import Release from './components/Release';
import NotFound from './components/NotFound';

export const routes = (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/admin' render={() => checkLogin()}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/genre' component={List} />
        <Route exact path='/genre/:genre' component={Genre} />
        <Route exact path='/genre/:genre/:release' component={Release} />
        <Route component={NotFound} />
    </Switch>
);