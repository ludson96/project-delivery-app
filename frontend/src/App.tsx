import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Products } from './pages/Products';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { SaleDetails } from './pages/SaleDetails';
import { Admin } from './pages/Admin';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/customer/products" component={Products} />
        <Route exact path="/customer/checkout" component={Checkout} />
        <Route exact path="/customer/orders" component={Orders} />
        <Route exact path="/customer/orders/:id" component={SaleDetails} />
        <Route exact path="/admin/manage" component={Admin} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
