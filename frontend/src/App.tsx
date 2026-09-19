import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FiWifi, FiBatteryCharging } from 'react-icons/fi';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Products } from './pages/Products';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { SaleDetails } from './pages/SaleDetails';
import { Admin } from './pages/Admin';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-6 font-sans">
      {/* Smartphone Device Frame */}
      <div className="relative w-full md:w-[412px] h-screen md:h-[844px] bg-slate-50 md:rounded-[52px] overflow-hidden md:border-[12px] md:border-slate-800 md:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] flex flex-col">
        
        {/* Barra de Status do Sistema / SafeZone com Câmera e Indicadores (apenas desktop) */}
        <div className="hidden md:flex h-9 bg-white items-center justify-between px-7 pt-1 z-50 border-b border-slate-100 select-none flex-shrink-0">
          {/* Horário */}
          <span className="text-[12px] font-bold text-slate-800 tracking-tight">09:41</span>
          
          {/* Dynamic Island / Notch Central com câmera frontal */}
          <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-end px-2">
            <div className="w-2 h-2 rounded-full bg-slate-950 border border-slate-800" />
          </div>

          {/* Ícones de sinal, wifi e bateria */}
          <div className="flex items-center space-x-1.5 text-slate-700 text-xs font-semibold">
            <FiWifi className="w-3.5 h-3.5" />
            <FiBatteryCharging className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        {/* Home Indicator Bar na base (apenas desktop) */}
        <div className="hidden md:flex absolute bottom-1.5 inset-x-0 h-4 items-center justify-center z-50 pointer-events-none">
          <div className="w-32 h-1 bg-slate-400/50 rounded-full" />
        </div>

        {/* Conteúdo rolável interno do app com SafeZone inferior */}
        <div className="w-full flex-1 overflow-y-auto overflow-x-hidden flex flex-col pb-2 md:pb-4">
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
