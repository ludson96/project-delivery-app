import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../images/logo.png';
import bg from '../images/background.webp';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const Register: React.FC = () => {
  const history = useHistory();
  const login = useAuthStore((state) => state.login);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length < 12) {
      toast.error('O nome completo deve ter pelo menos 12 caracteres');
      return;
    }

    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/register`, {
        name,
        email,
        password,
      });

      const { token, user } = response.data;
      const userData = user || { name, email, role: 'customer' };

      login(userData, token);
      toast.success('Conta criada com sucesso! Boas compras 🍻');
      history.push('/customer/products');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast.error(error.response?.data?.message || 'Erro ao registrar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex-1 flex flex-col justify-center items-center p-4 min-h-full"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-xl my-auto">
        {/* Brand com Logo Original */}
        <div className="text-center mb-5">
          <img
            src={logo}
            alt="Docker Drinks Logo"
            className="h-16 w-auto mx-auto object-contain mb-1.5 hover:scale-105 transition-transform"
          />
          <h1 className="text-lg font-black text-slate-800">Criar Nova Conta</h1>
          <p className="text-[11px] text-slate-500">Cadastre-se na Docker Drinks em poucos segundos</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nome Completo
            </label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
              <input
                type="text"
                required
                placeholder="Nome e Sobrenome (mín. 12 letras)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl pl-10 pr-3.5 py-3 focus:border-[#192A56] focus:outline-none focus:ring-2 focus:ring-[#FDEB37]"
              />
            </div>
          </div>

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
                placeholder="Mínimo de 6 dígitos"
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
            <FiUserPlus className="w-5 h-5 text-[#FDEB37]" />
            <span>{loading ? 'Cadastrando...' : 'Cadastrar'}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-600">
            Já possui uma conta?{' '}
            <Link to="/login" className="text-[#192A56] hover:underline font-bold">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
