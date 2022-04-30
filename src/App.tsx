import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// REDUX
import { bindActionCreators } from 'redux';
import { useAppSelector, useAppDispatch } from './state/hooks';
import { UsersActionCreators } from './state';
import setAuthToken from './utils/setAuthToken';
// COMPONENTS
import './App.css';
import Nav from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { PublicRoutes, PrivateRoutes } from './components/routing';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App: FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { loadUser } = bindActionCreators(UsersActionCreators, dispatch);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <Nav />
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
      <Footer />
    </Router>
  );
};

export default App;
