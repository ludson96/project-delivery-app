import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiShoppingBag, FiPackage, FiUser } from 'react-icons/fi';
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Original Docker Drinks */}
          <Link to="/customer/products" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Docker Drinks Logo"
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/customer/products"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <FiShoppingBag className="w-4 h-4 text-[#192A56]" />
              <span className="hidden sm:inline uppercase tracking-wider">Produtos</span>
            </Link>

            <Link
              to="/customer/orders"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <FiPackage className="w-4 h-4 text-[#192A56]" />
              <span className="hidden sm:inline uppercase tracking-wider">Meus Pedidos</span>
            </Link>

            <Link
              to="/customer/checkout"
              className="relative flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-[#FDEB37]/30 text-slate-900 hover:bg-[#FDEB37]/60 border border-[#FDEB37] transition-all shadow-sm"
            >
              <span className="uppercase tracking-wider">Carrinho</span>
              {totalCartCount > 0 && (
                <span className="ml-1.5 px-2 py-0.5 text-xs font-black bg-[#192A56] text-white rounded-full">
                  {totalCartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* User profile & Logout */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700">
              <FiUser className="text-[#192A56]" />
              <span className="font-semibold max-w-[140px] truncate">{displayName}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center text-sm font-bold"
              title="Sair da conta"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="hidden sm:inline ml-1">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
