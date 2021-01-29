import React from 'react';
import { Switch, Route } from 'react-router';
import { Home, Companies, SignUp } from './pages/index';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/companies" component={Companies} />
    <Route exact path="/signup" component={SignUp} />
  </Switch>
);

export default Router;
