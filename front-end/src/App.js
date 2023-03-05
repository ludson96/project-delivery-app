import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Provider from './context/myProvider';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Register from './pages/register';
import Products from './pages/products';
import Checkout from './pages/checkout';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
