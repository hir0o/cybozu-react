import React from 'react';
import { Switch, Route } from 'react-router';
import { Home, Companies } from './pages/index';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/companies" component={Companies} />
  </Switch>
);

export default Router;
