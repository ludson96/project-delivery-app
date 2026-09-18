import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './useCartStore';

describe('useCartStore (Zustand)', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('deve inicializar com carrinho vazio', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.totalPrice).toBe(0);
  });

  it('deve adicionar um produto e calcular o total corretamente', () => {
    useCartStore.getState().addItem({ id: 1, name: 'Heineken 600ml', price: 7.5 }, 2);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.totalPrice).toBe(15);
  });

  it('deve limpar o carrinho', () => {
    useCartStore.getState().addItem({ id: 2, name: 'Skol Lata 250ml', price: 2.2 }, 1);
    expect(useCartStore.getState().items).toHaveLength(1);

    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().totalPrice).toBe(0);
  });
});
