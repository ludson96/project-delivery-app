import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiShoppingBag, FiPackage } from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import logo from '../images/logo.png';

export const NavBar: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [displayName, setDisplayName] = useState('Usuário');

  useEffect(() => {
    if (user?.name) {
      setDisplayName(user.name);
    } else {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setDisplayName(parsed.name || 'Usuário');
        } catch {
          // ignore
        }
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 shadow-xs">
      <div className="flex items-center justify-between">
        {/* Logo Docker Drinks */}
        <Link to="/customer/products" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Docker Drinks Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Action Links & Cart */}
        <div className="flex items-center space-x-1.5">
          <Link
            to="/customer/products"
            className="p-2 text-slate-700 hover:text-[#192A56] hover:bg-slate-100 rounded-xl transition-colors"
            title="Produtos"
          >
            <FiShoppingBag className="w-5 h-5" />
          </Link>

          <Link
            to="/customer/orders"
            className="p-2 text-slate-700 hover:text-[#192A56] hover:bg-slate-100 rounded-xl transition-colors"
            title="Meus Pedidos"
          >
            <FiPackage className="w-5 h-5" />
          </Link>

          <Link
            to="/customer/checkout"
            className="relative p-2 bg-[#FDEB37]/30 hover:bg-[#FDEB37]/50 text-slate-900 rounded-xl border border-[#FDEB37] transition-all"
            title="Carrinho"
          >
            <span className="text-xs font-black">🛒</span>
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[10px] font-black bg-[#192A56] text-white rounded-full">
                {totalCartCount}
              </span>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
            title={`Sair (${displayName})`}
          >
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
