import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiShoppingCart, FiAlertCircle } from 'react-icons/fi';
import { NavBar } from '../components/Navbar';
import { CardProduct } from '../components/CardProduct';
import { useCartStore } from '../store/useCartStore';

interface Product {
  id: number;
  name: string;
  price: string | number;
  urlImage: string;
}

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalItemsCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar produtos:', err);
        setError('Não foi possível carregar o catálogo de bebidas.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Hero com identidade Docker Drinks */}
        <div className="mb-8 bg-gradient-to-r from-[#192A56] to-[#273c75] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FDEB37] bg-white/10 px-3 py-1 rounded-full">
              Distribuidora Oficial
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mt-3 tracking-tight">
              Docker Drinks 🍺
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-2 max-w-xl">
              As melhores cervejas e bebidas geladas entregues rapidamente na sua porta. Escolha seus produtos e aproveite!
            </p>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-white border border-slate-200 rounded-3xl animate-pulse flex flex-col p-4 shadow-sm"
              >
                <div className="h-48 bg-slate-100 rounded-2xl mb-4" />
                <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
                <div className="h-6 bg-slate-100 rounded w-1/3 mt-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center space-x-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl">
            <FiAlertCircle className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <CardProduct
                key={`prod-${product.id}`}
                id={product.id}
                title={product.name}
                price={product.price}
                image={product.urlImage}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Checkout Button */}
      {totalPrice > 0 && (
        <div className="fixed bottom-6 inset-x-0 flex justify-center px-4 z-40">
          <Link
            to="/customer/checkout"
            className="flex items-center justify-between w-full max-w-md bg-[#192A56] hover:bg-[#121e3f] text-white font-bold px-6 py-4 rounded-2xl shadow-2xl shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDEB37] text-slate-950 flex items-center justify-center">
                <FiShoppingCart className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs uppercase tracking-wider font-extrabold text-slate-300">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'} no carrinho
                </span>
                <span className="text-base font-black">Finalizar Compra</span>
              </div>
            </div>
            <span className="text-base font-black bg-[#FDEB37] text-slate-950 px-3.5 py-1.5 rounded-xl shadow-sm">
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Products;
