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
    <div className="min-h-screen bg-slate-50 pb-20">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-[#192A56] text-[#FDEB37] flex items-center justify-center shadow-sm">
            <FiShield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Painel do Administrador</h1>
            <p className="text-xs text-slate-500">Gerenciamento de usuários e permissões da Docker Drinks</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <FiUsers className="text-[#192A56]" />
              <span>Usuários Cadastrados</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Total: {users.length} usuários
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200 bg-slate-50">
                    <th className="py-3 px-4 rounded-l-xl">#</th>
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">E-mail</th>
                    <th className="py-3 px-4 rounded-r-xl">Função / Cargo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u, idx) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{u.name}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#192A56]/10 text-[#192A56] capitalize">
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
