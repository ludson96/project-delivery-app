import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Provider from './context/myProvider';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import DeliveryDetails from './components/DeliveryDetails';

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
        <Route exact path="/customer/sale-details/:id" component={ DeliveryDetails } />
        <Route exact path="/customer/sale-details/last" component={ DeliveryDetails } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
