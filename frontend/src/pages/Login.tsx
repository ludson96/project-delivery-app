import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../images/logo.png';
import bg from '../images/background.webp';

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
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-12"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 shadow-2xl">
        {/* Brand com Logo Original */}
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Docker Drinks Logo"
            className="h-28 w-auto mx-auto object-contain mb-2 hover:scale-105 transition-transform"
          />
          <p className="text-xs text-slate-500 font-medium">Bebidas geladas entregues na velocidade da luz</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl pl-10 pr-3.5 py-3 focus:border-[#192A56] focus:outline-none focus:ring-2 focus:ring-[#FDEB37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Senha
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl pl-10 pr-3.5 py-3 focus:border-[#192A56] focus:outline-none focus:ring-2 focus:ring-[#FDEB37]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center space-x-2 bg-[#192A56] hover:bg-[#121e3f] disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <FiLogIn className="w-5 h-5 text-[#FDEB37]" />
            <span>{loading ? 'Entrando...' : 'Entrar'}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-600">
            Ainda não tem uma conta?{' '}
            <Link to="/register" className="text-[#192A56] hover:underline font-bold">
              Cadastre-se agora
            </Link>
          </p>
        </div>

        {/* Credenciais para teste */}
        <div className="mt-6 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600">
          <p className="font-bold text-slate-800 mb-1">💡 Credenciais para teste:</p>
          <p>Cliente: <span className="text-[#192A56] font-mono font-semibold">zebirita@email.com</span> / <span className="text-[#192A56] font-mono font-semibold">$#zebirita#$</span></p>
          <p>Vendedor: <span className="text-[#192A56] font-mono font-semibold">fulana@deliveryapp.com</span> / <span className="text-[#192A56] font-mono font-semibold">fulana123</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
