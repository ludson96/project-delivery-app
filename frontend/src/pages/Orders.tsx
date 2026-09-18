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
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <FiCheckCircle className="w-3.5 h-3.5 mr-1" /> Entregue
        </span>
      );
    }
    if (s.includes('trânsito') || s.includes('transito') || s.includes('caminho')) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
          <FiTruck className="w-3.5 h-3.5 mr-1" /> Em Trânsito
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
        <FiClock className="w-3.5 h-3.5 mr-1" /> {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Meus Pedidos 📦</h1>
            <p className="text-sm text-slate-500 mt-1">Acompanhe suas entregas da Docker Drinks em tempo real.</p>
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-white border border-slate-200 rounded-3xl animate-pulse shadow-sm" />
            ))}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm">
            <FiPackage className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">Nenhum pedido encontrado</h3>
            <p className="text-sm text-slate-500 mb-6">Você ainda não realizou nenhum pedido na Docker Drinks.</p>
            <Link
              to="/customer/products"
              className="px-5 py-2.5 bg-[#192A56] hover:bg-[#121e3f] text-white font-bold rounded-xl text-sm transition-colors"
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
                  className="bg-white border border-slate-200 hover:border-[#192A56] p-6 rounded-3xl transition-all shadow-sm hover:shadow-lg group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-black text-[#192A56] uppercase tracking-wider">
                        Pedido #{String(order.id).padStart(4, '0')}
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">{formattedDate}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Total do pedido</span>
                    <span className="text-lg font-black text-slate-800 group-hover:text-[#192A56] transition-colors">
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
