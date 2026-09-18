import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const Login: React.FC = () => {
  const history = useHistory();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Preencha e-mail e senha');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/login`, { email, password });
      const { token, user } = response.data;

      login(user, token);
      toast.success(`Bem-vindo de volta, ${user.name}!`);

      if (user.role === 'administrator') {
        history.push('/admin/manage');
      } else {
        history.push('/customer/products');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast.error(error.response?.data?.message || 'E-mail ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-amber-500/20">
            🍺
          </div>
          <h1 className="text-2xl font-black text-white">Delivery App</h1>
          <p className="text-xs text-slate-400 mt-1">Sua distribuidora de bebidas online favorita</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-3.5 py-3 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Senha
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-3.5 py-3 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
          >
            <FiLogIn className="w-5 h-5" />
            <span>{loading ? 'Entrando...' : 'Entrar'}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Ainda não tem uma conta?{' '}
            <Link to="/register" className="text-amber-400 hover:underline font-semibold">
              Cadastre-se agora
            </Link>
          </p>
        </div>

        {/* Dica rápida com contas de teste */}
        <div className="mt-6 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1">💡 Credenciais para teste:</p>
          <p>Cliente: <span className="text-amber-400 font-mono">zebirita@email.com</span> / <span className="text-amber-400 font-mono">$#zebirita#$</span></p>
          <p>Vendedor: <span className="text-amber-400 font-mono">fulana@deliveryapp.com</span> / <span className="text-amber-400 font-mono">fulana123</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
