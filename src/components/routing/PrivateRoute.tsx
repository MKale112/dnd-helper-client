import React, { FC } from 'react';
import { Route, Redirect } from 'react-router';
import { useAppSelector } from '../../state/hooks';

interface RestProps {
  exact?: boolean | undefined;
  path?: string | readonly string[] | undefined;
}

interface Props {
  component: FC;
  rest: RestProps;
}

const PrivateRoute: FC<Props> = ({ component, rest }) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  /* eslint-disable react/jsx-props-no-spreading */
  return <Route {...rest} render={() => (!isAuthenticated && !isLoading ? <Redirect to='/login' /> : component)} />;
};

export default PrivateRoute;
