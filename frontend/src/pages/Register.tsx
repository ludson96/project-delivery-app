import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';

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
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-amber-500/20">
            🍺
          </div>
          <h1 className="text-2xl font-black text-white">Criar Nova Conta</h1>
          <p className="text-xs text-slate-400 mt-1">Junte-se ao Delivery App em segundos</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Nome Completo
            </label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
              <input
                type="text"
                required
                placeholder="Nome e Sobrenome (mín. 12 letras)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-3.5 py-3 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

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
                placeholder="Mínimo de 6 dígitos"
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
            <FiUserPlus className="w-5 h-5" />
            <span>{loading ? 'Cadastrando...' : 'Cadastrar'}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Já possui uma conta?{' '}
            <Link to="/login" className="text-amber-400 hover:underline font-semibold">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
