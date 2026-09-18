import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiClock, FiMapPin } from 'react-icons/fi';
import { NavBar } from '../components/Navbar';
import { socket } from '../services/socket';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

interface SaleItem {
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number | string;
    urlImage?: string;
  };
}

interface Sale {
  id: number;
  status: string;
  saleDate: string;
  totalPrice: number | string;
  deliveryAddress: string;
  deliveryNumber: string;
  products?: SaleItem[];
}

export const SaleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sale, setSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      const stored = localStorage.getItem('user');
      if (!stored) return;
      const { token } = JSON.parse(stored);

      try {
        const res = await axios.get(`${BACKEND_URL}/sales`, {
          headers: { Authorization: token },
        });
        const current = res.data.find((s: Sale) => s.id === Number(id));
        setSale(current || null);
      } catch (err) {
        console.error('Erro ao buscar detalhes da venda:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleDetails();

    const handleStatusUpdate = ({ saleId, status }: { saleId: number; status: string }) => {
      if (saleId === Number(id)) {
        setSale((prev) => (prev ? { ...prev, status } : prev));
      }
    };

    socket.on('order_status_update', handleStatusUpdate);

    return () => {
      socket.off('order_status_update', handleStatusUpdate);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 pt-12">
          <div className="h-64 bg-white rounded-3xl animate-pulse shadow-sm border border-slate-200" />
        </div>
      </div>
    );
  }

  if (!sale) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavBar />
        <div className="max-w-md mx-auto px-4 pt-16 text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Pedido não encontrado</h2>
          <Link to="/customer/orders" className="text-[#192A56] font-bold hover:underline text-sm">
            Voltar aos pedidos
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(sale.saleDate).toLocaleDateString('pt-BR');
  const price = Number(sale.totalPrice).toFixed(2).replace('.', ',');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <NavBar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/customer/orders"
          className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#192A56] mb-4 space-x-1.5 transition-colors uppercase tracking-wider"
        >
          <FiArrowLeft />
          <span>Voltar para todos os pedidos</span>
        </Link>

        {/* Card Header com Status */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs uppercase font-black text-[#192A56] tracking-wider">
                Detalhes do Pedido
              </span>
              <h1 className="text-2xl font-black text-slate-800 mt-0.5">
                Pedido #{String(sale.id).padStart(4, '0')}
              </h1>
              <p className="text-xs text-slate-500 mt-1">Realizado em {formattedDate}</p>
            </div>

            <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl">
              <span className="text-xs text-amber-900 font-semibold">Status:</span>
              <span className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center">
                <FiClock className="mr-1.5" /> {sale.status}
              </span>
            </div>
          </div>

          {/* Endereço */}
          <div className="pt-6 flex items-start space-x-3 text-slate-700 text-sm">
            <FiMapPin className="w-5 h-5 text-[#192A56] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">Endereço de Entrega</p>
              <p className="text-slate-600 text-xs mt-0.5">
                {sale.deliveryAddress}, Nº {sale.deliveryNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Itens do Pedido */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Itens Comprados</h2>

          <div className="divide-y divide-slate-100">
            {sale.products?.map((item, index) => {
              const itemPrice = Number(item.product?.price || 0);
              const subtotal = itemPrice * item.quantity;

              return (
                <div key={index} className="py-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-slate-400 w-5 text-center">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{item.product?.name}</h4>
                      <span className="text-xs text-slate-500">
                        {item.quantity}x de R$ {itemPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-black text-slate-800">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-500">Valor Total</span>
            <span className="text-2xl font-black text-[#192A56]">R$ {price}</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SaleDetails;
