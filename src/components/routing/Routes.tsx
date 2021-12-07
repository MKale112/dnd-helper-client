import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import Register from '../authentication/Register';
import Login from '../authentication/Login';

export const Routes: FC = () => (
  <>
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
  </>
);
