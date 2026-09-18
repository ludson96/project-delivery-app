import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUsers, FiShield } from 'react-icons/fi';
import { NavBar } from '../components/Navbar';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const stored = localStorage.getItem('user');
      if (!stored) return;
      const { token } = JSON.parse(stored);

      try {
        const res = await axios.get(`${BACKEND_URL}/admin/manager`, {
          headers: { Authorization: token },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <FiShield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Painel do Administrador</h1>
            <p className="text-xs text-slate-400">Gerenciamento de usuários e permissões de acesso</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <FiUsers className="text-amber-400" />
              <span>Usuários Cadastrados</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Total: {users.length} usuários
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-950 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">E-mail</th>
                    <th className="py-3 px-4">Função / Cargo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {users.map((u, idx) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">{u.name}</td>
                      <td className="py-3.5 px-4 text-slate-300 font-mono text-xs">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 capitalize">
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
