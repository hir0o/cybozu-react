import React from 'react';
import { Switch, Route } from 'react-router';
import {
  CompanyList,
  SignUp,
  SignIn,
  CompanyEdit,
  CompanyDetail,
  UserEdit,
} from './pages/index';
import Auth from './Auth';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Auth>
      <Switch>
        <Route exact path="/users/edit" component={UserEdit} />
        <Route exact path="/companies" component={CompanyList} />
        <Route path="/companies/edit(/:id)?" component={CompanyEdit} />
        <Route exact path="/companies/:id" component={CompanyDetail} />
      </Switch>
    </Auth>
  </Switch>
);

export default Router;
