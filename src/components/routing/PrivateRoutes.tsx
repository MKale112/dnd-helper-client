import React, { FC } from 'react';
import { useLocation, Switch, Redirect, Route } from 'react-router';
import Dashboard from '../../pages/Dashboard';
import Session from '../../pages/Session';

export const PrivateRoutes: FC = () => {
  const location = useLocation();

  return (
    <Switch>
      {/* {location.pathname === '/' && <Redirect to='/dashboard' />} */}
      <Route exact path='/dashboard' component={Dashboard} />
      <Route path='/session/:id' component={Session} />
      <Route path='*' component={() => <Redirect to='/dashboard' />} />
    </Switch>
  );
};
