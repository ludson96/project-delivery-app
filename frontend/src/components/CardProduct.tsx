import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useCartStore } from '../store/useCartStore';

interface CardProductProps {
  id: number;
  title: string;
  price: string | number;
  image: string;
}

export const CardProduct: React.FC<CardProductProps> = ({ id, title, price, image }) => {
  const numPrice = Number(price);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const addItem = useCartStore((state) => state.addItem);

  const currentItem = items.find((item) => item.id === id);
  const quantity = currentItem ? currentItem.quantity : 0;

  const handleMinus = () => {
    if (quantity > 0) {
      updateQuantity(id, quantity - 1);
    }
  };

  const handlePlus = () => {
    if (quantity === 0) {
      addItem({ id, name: title, price: numPrice, urlImage: image }, 1);
    } else {
      updateQuantity(id, quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val <= 0) {
      updateQuantity(id, 0);
    } else {
      if (quantity === 0) {
        addItem({ id, name: title, price: numPrice, urlImage: image }, val);
      } else {
        updateQuantity(id, val);
      }
    }
  };

  const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  let resolvedImageUrl = image;
  if (image && image.includes('localhost:3001') && backendUrl !== 'http://localhost:3001') {
    resolvedImageUrl = image.replace('http://localhost:3001', backendUrl);
  } else if (image && image.startsWith('/images/')) {
    resolvedImageUrl = `${backendUrl}${image}`;
  }

  return (
    <div className="flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#192A56]/40 transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative h-48 w-full bg-slate-50 flex items-center justify-center p-4 overflow-hidden border-b border-slate-100">
        <img
          src={resolvedImageUrl}
          alt={title}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-[#FDEB37] text-slate-900 font-extrabold px-3 py-1 rounded-full text-xs shadow-sm border border-yellow-300">
          R$ {numPrice.toFixed(2).replace('.', ',')}
        </div>
      </div>

      {/* Info & Quantity Controls */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-1 group-hover:text-[#192A56] transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500">Qtd</span>
          <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-1">
            <button
              onClick={handleMinus}
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-slate-200 transition-colors shadow-xs"
            >
              <FiMinus className="w-3.5 h-3.5" />
            </button>

            <input
              type="number"
              min="0"
              value={quantity}
              onChange={handleInputChange}
              className="w-10 text-center bg-transparent text-sm font-bold text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              onClick={handlePlus}
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#192A56] text-white hover:bg-[#121e3f] transition-colors shadow-xs font-bold"
            >
              <FiPlus className="w-3.5 h-3.5 text-[#FDEB37]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
