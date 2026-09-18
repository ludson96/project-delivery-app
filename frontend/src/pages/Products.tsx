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
    <div className="min-h-screen bg-slate-950 pb-24">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Header Hero */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Catálogo de Bebidas 🍻
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            Escolha suas bebidas favoritas geladas e receba em minutos na sua casa.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-72 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse flex flex-col p-4"
              >
                <div className="h-44 bg-slate-800 rounded-xl mb-4" />
                <div className="h-4 bg-slate-800 rounded w-3/4 mb-2" />
                <div className="h-6 bg-slate-800 rounded w-1/3 mt-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center space-x-3 bg-red-950/40 border border-red-800 text-red-300 p-4 rounded-xl">
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
            className="flex items-center justify-between w-full max-w-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-4 rounded-2xl shadow-2xl shadow-amber-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-950/10 flex items-center justify-center">
                <FiShoppingCart className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs uppercase tracking-wider font-extrabold text-slate-900">
                  Ver Carrinho ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'})
                </span>
                <span className="text-base font-black">Finalizar Compra</span>
              </div>
            </div>
            <span className="text-lg font-black bg-slate-950 text-amber-400 px-3 py-1 rounded-xl">
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Products;
