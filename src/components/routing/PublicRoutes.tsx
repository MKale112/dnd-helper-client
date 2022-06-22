import React, { FC } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
// ROUTES
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import Landing from '../../pages/Landing';

export const PublicRoutes: FC = () => {
  const location = useLocation();

  return (
    <Switch>
      {location.pathname === '/' && <Redirect to='/home' />}
      <Route exact path='/home' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Redirect to='/home' />
    </Switch>
  );
};
