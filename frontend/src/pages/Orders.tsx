import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiPackage, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { NavBar } from '../components/Navbar';
import { socket } from '../services/socket';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

interface Order {
  id: number;
  sellerId: number;
  status: string;
  saleDate: string;
  totalPrice: number | string;
}

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const stored = localStorage.getItem('user');
      if (!stored) return;
      const { token } = JSON.parse(stored);

      try {
        const res = await axios.get(`${BACKEND_URL}/sales`, {
          headers: { Authorization: token },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Atualização em tempo real via Socket.IO
    const handleStatusUpdate = ({ saleId, status }: { saleId: number; status: string }) => {
      setOrders((prev) =>
        prev.map((order) => (order.id === saleId ? { ...order, status } : order))
      );
    };

    socket.on('order_status_update', handleStatusUpdate);

    return () => {
      socket.off('order_status_update', handleStatusUpdate);
    };
  }, []);

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('entregue')) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <FiCheckCircle className="w-3.5 h-3.5 mr-1" /> Entregue
        </span>
      );
    }
    if (s.includes('trânsito') || s.includes('transito') || s.includes('caminho')) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <FiTruck className="w-3.5 h-3.5 mr-1" /> Em Trânsito
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <FiClock className="w-3.5 h-3.5 mr-1" /> {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Meus Pedidos 📦</h1>
            <p className="text-sm text-slate-400 mt-1">Acompanhe o status das suas entregas em tempo real.</p>
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto">
            <FiPackage className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Nenhum pedido encontrado</h3>
            <p className="text-sm text-slate-400 mb-6">Você ainda não realizou nenhum pedido no app.</p>
            <Link
              to="/customer/products"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-colors"
            >
              Fazer Primeiro Pedido
            </Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => {
              const formattedDate = new Date(order.saleDate).toLocaleDateString('pt-BR');
              const price = Number(order.totalPrice).toFixed(2).replace('.', ',');

              return (
                <Link
                  key={order.id}
                  to={`/customer/orders/${order.id}`}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                        Pedido #{String(order.id).padStart(4, '0')}
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5">{formattedDate}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Total do pedido</span>
                    <span className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                      R$ {price}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
