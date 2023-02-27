import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import NotFound from './pages/notFound';

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
    </Switch>
  );
}

export default App;
