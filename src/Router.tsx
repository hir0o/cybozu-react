import React from 'react';
import { Switch, Route } from 'react-router';
import {
  Home, Companies, SignUp, SignIn,
} from './pages/index';
import Auth from './Auth';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Auth>
      <Route exact path="/companies" component={Companies} />
    </Auth>
  </Switch>
);

export default Router;
