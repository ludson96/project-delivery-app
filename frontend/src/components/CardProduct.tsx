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

  return (
    <div className="flex flex-col bg-slate-800/80 rounded-2xl border border-slate-700/60 overflow-hidden shadow-lg hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative h-48 w-full bg-slate-900/60 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-full text-xs shadow-md">
          R$ {numPrice.toFixed(2).replace('.', ',')}
        </div>
      </div>

      {/* Info & Quantity Controls */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <h3 className="font-semibold text-slate-100 text-sm sm:text-base line-clamp-1 group-hover:text-amber-400 transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-700/50">
          <span className="text-xs text-slate-400">Quantidade</span>
          <div className="flex items-center bg-slate-900/80 rounded-xl border border-slate-700 p-1">
            <button
              onClick={handleMinus}
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <FiMinus className="w-3.5 h-3.5" />
            </button>

            <input
              type="number"
              min="0"
              value={quantity}
              onChange={handleInputChange}
              className="w-10 text-center bg-transparent text-sm font-semibold text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              onClick={handlePlus}
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors font-bold"
            >
              <FiPlus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
