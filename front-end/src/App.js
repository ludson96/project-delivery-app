import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Register from './pages/register';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/login"
        component={ Login }
      />
      <Route
        exact
        path="*"
        component={ NotFound }
      />
      <Route exact path="register" component={ Register } />
      <Route exact path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
