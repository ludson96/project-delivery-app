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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 md:p-6 font-sans">
      {/* Smartphone Device Frame (visível com moldura no Desktop, tela cheia no Mobile) */}
      <div className="relative w-full md:w-[412px] h-screen md:h-[844px] bg-slate-50 md:rounded-[48px] overflow-hidden md:border-[10px] md:border-slate-800 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col">
        
        {/* Dynamic Island / Notch do smartphone (apenas desktop) */}
        <div className="hidden md:flex absolute top-0 inset-x-0 h-6 items-center justify-center z-50 pointer-events-none">
          <div className="w-24 h-4 bg-slate-800 rounded-full flex items-center justify-end px-2">
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
          </div>
        </div>

        {/* Home Indicator Bar na base (apenas desktop) */}
        <div className="hidden md:flex absolute bottom-1 inset-x-0 h-4 items-center justify-center z-50 pointer-events-none">
          <div className="w-32 h-1 bg-slate-400/40 rounded-full" />
        </div>

        {/* Conteúdo rolável interno com proporção de app mobile */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col">
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
      </div>
    </div>
  );
};

export default App;
