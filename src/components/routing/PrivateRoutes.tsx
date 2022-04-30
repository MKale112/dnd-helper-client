import React, { FC } from 'react';
import { useLocation, Switch, Redirect, Route } from 'react-router';
import Dashboard from '../../pages/Dashboard';

export const PrivateRoutes: FC = () => {
  const location = useLocation();

  return (
    <Switch>
      {location.pathname === '/' && <Redirect to='/dashboard' />}
      <Route exact path='/dashboard' component={Dashboard} />

      <Redirect to='/dashboard' />
    </Switch>
  );
};
