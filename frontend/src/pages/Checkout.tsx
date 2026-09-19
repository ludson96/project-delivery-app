import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiTrash2, FiShoppingBag, FiMapPin, FiTruck } from 'react-icons/fi';
import { NavBar } from '../components/Navbar';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const Checkout: React.FC = () => {
  const history = useHistory();
  const { items, totalPrice, removeItem, clearCart } = useCartStore();
  const { token } = useAuthStore();

  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFinishOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    if (!address.trim() || !houseNumber.trim()) {
      toast.error('Preencha o endereço e número para entrega');
      return;
    }

    const authToken = token || JSON.parse(localStorage.getItem('user') || '{}')?.token;

    if (!authToken) {
      toast.error('Você precisa estar logado para finalizar o pedido');
      history.push('/login');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        totalPrice,
        deliveryAddress: address,
        deliveryNumber: houseNumber,
        sellerId: 2,
        products: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post(`${BACKEND_URL}/sales`, payload, {
        headers: {
          Authorization: authToken,
        },
      });

      toast.success('Pedido realizado com sucesso! 🚀');
      clearCart();

      const saleId = response.data.saleId || response.data.id;
      history.push(`/customer/orders/${saleId}`);
    } catch (error: any) {
      console.error('Erro ao criar pedido:', error);
      toast.error(error.response?.data?.message || 'Falha ao processar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6">
          Finalizar Pedido 🛒
        </h1>

        {items.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-[#FDEB37]/30 text-[#192A56] rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Seu carrinho está vazio</h2>
            <p className="text-slate-500 text-sm mb-6">
              Adicione algumas bebidas da Docker Drinks ao seu carrinho para continuar.
            </p>
            <Link
              to="/customer/products"
              className="inline-flex items-center px-6 py-3 bg-[#192A56] hover:bg-[#121e3f] text-white font-bold rounded-xl shadow-md transition-colors"
            >
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Itens do Pedido */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
                  <span>Itens Selecionados</span>
                  <span className="text-xs text-slate-500 font-normal">({items.length} itens)</span>
                </h2>

                <div className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 text-center text-xs font-bold text-slate-400">
                          {idx + 1}
                        </span>
                        {item.urlImage && (
                          <img
                            src={
                              item.urlImage.includes('localhost:3001') && BACKEND_URL !== 'http://localhost:3001'
                                ? item.urlImage.replace('http://localhost:3001', BACKEND_URL)
                                : item.urlImage.startsWith('/images/')
                                ? `${BACKEND_URL}${item.urlImage}`
                                : item.urlImage
                            }
                            alt={item.name}
                            className="w-12 h-12 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100"
                          />
                        )}
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                          <span className="text-xs text-slate-500">
                            {item.quantity}x de R$ {item.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="font-extrabold text-[#192A56] text-sm">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          type="button"
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remover item"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 text-sm font-semibold">Subtotal</span>
                  <span className="text-xl font-black text-[#192A56]">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            {/* Endereço de Entrega e Checkout */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                  <FiMapPin className="text-[#192A56]" />
                  <span>Dados da Entrega</span>
                </h2>

                <form onSubmit={handleFinishOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Vendedor Responsável
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Fulana Pereira (Distribuidora Oficial)"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-500 text-sm rounded-xl px-3.5 py-2.5 cursor-not-allowed font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Endereço (Rua / Av)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Av. Paulista"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:border-[#192A56] focus:outline-none focus:ring-2 focus:ring-[#FDEB37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Número / Complemento
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 1000, Apto 42"
                      value={houseNumber}
                      onChange={(e) => setHouseNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:border-[#192A56] focus:outline-none focus:ring-2 focus:ring-[#FDEB37]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 flex items-center justify-center space-x-2 bg-[#192A56] hover:bg-[#121e3f] disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
                  >
                    <FiTruck className="w-5 h-5 text-[#FDEB37]" />
                    <span>{loading ? 'Processando...' : 'Confirmar e Enviar Pedido'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
