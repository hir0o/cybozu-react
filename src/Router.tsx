import React from 'react';
import { Switch, Route } from 'react-router';
import { Home, Companies, SignUp } from './pages/index';
import Auth from './Auth';

const Router: React.FC = () => (
  <Switch>
    <Auth>
      <Route exact path="/" component={Home} />
      <Route exact path="/companies" component={Companies} />
      <Route exact path="/signup" component={SignUp} />
    </Auth>
  </Switch>
);

export default Router;
