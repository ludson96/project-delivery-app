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
    <div className="flex-1 flex flex-col bg-slate-50 pb-24">
      <NavBar />

      <main className="p-4 flex-1">
        {/* Banner Hero Mobile */}
        <div className="mb-4 bg-gradient-to-r from-[#192A56] to-[#273c75] rounded-2xl p-4 text-white shadow-md">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#FDEB37] bg-white/10 px-2 py-0.5 rounded-full">
            Distribuidora Oficial
          </span>
          <h1 className="text-xl font-black mt-1 tracking-tight">
            Docker Drinks 🍺
          </h1>
          <p className="text-xs text-slate-200 mt-1">
            Bebidas geladas entregues na velocidade da luz.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-56 bg-white border border-slate-200 rounded-2xl animate-pulse p-3 flex flex-col"
              >
                <div className="h-28 bg-slate-100 rounded-xl mb-2" />
                <div className="h-3 bg-slate-100 rounded w-3/4 mb-1" />
                <div className="h-4 bg-slate-100 rounded w-1/2 mt-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Products Grid (2 colunas perfeitas para smartphone) */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-3">
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

      {/* Floating Checkout Button (ajustado para a largura do celular) */}
      {totalPrice > 0 && (
        <div className="fixed md:absolute bottom-3 inset-x-0 px-4 z-40 flex justify-center">
          <Link
            to="/customer/checkout"
            className="flex items-center justify-between w-full bg-[#192A56] hover:bg-[#121e3f] text-white font-bold px-4 py-3 rounded-2xl shadow-xl shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FDEB37] text-slate-950 flex items-center justify-center text-xs">
                <FiShoppingCart className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase font-black text-slate-300">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'}
                </span>
                <span className="text-xs font-black">Ver Carrinho</span>
              </div>
            </div>
            <span className="text-xs font-black bg-[#FDEB37] text-slate-950 px-2.5 py-1 rounded-lg">
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Products;
