import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// REDUX
import { Provider } from 'react-redux';
import store from './state/store';
//
import './App.css';
import Nav from './components/layout/Navbar';
import Landing from './pages/Landing';
import { Routes } from './components/routing/Routes';
import Footer from './components/layout/Footer';

const App: FC = () => (
  <Provider store={store}>
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route component={Routes} />
      </Switch>
      <Footer />
    </Router>
  </Provider>
);

export default App;
