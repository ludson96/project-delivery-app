import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiShoppingBag, FiPackage, FiUser } from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

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
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/customer/products" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              🍺
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Delivery App
              </span>
              <span className="text-xs text-amber-500 font-medium">Bebidas Express</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/customer/products"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <FiShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Produtos</span>
            </Link>

            <Link
              to="/customer/orders"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <FiPackage className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Meus Pedidos</span>
            </Link>

            <Link
              to="/customer/checkout"
              className="relative flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
            >
              <span>Carrinho</span>
              {totalCartCount > 0 && (
                <span className="ml-1.5 px-2 py-0.5 text-xs font-bold bg-amber-500 text-slate-950 rounded-full animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* User profile & Logout */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <FiUser className="text-amber-400" />
              <span className="font-medium max-w-[140px] truncate">{displayName}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center text-sm font-medium"
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
