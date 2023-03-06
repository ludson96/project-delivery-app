import React, { useState } from 'react';
import ProductsOrderDetails from './ProductOrderDetails';
import helpers from '../helpers';

const { getTotal, getCartProducts } = helpers;
function OrderDetails() {
  const [products, setProducts] = useState(getCartProducts());
  const removeOrderProduct = (product) => {
    const actProducts = JSON.parse(localStorage.getItem('carrinho'));
    localStorage.setItem(
      'carrinho',
      JSON.stringify(
        actProducts.filter((currProduct) => product.title !== currProduct.title),
      ),
    );
    setProducts(getCartProducts());
  };

  return (
    <div className="order-details">
      <h1>Finalizar Pedido</h1>
      <div>
        <ProductsOrderDetails
          products={ products }
          removeOrderProduct={ removeOrderProduct }
        />
        <div className="total-check-container">
          <div
            className="total-checkout"
            data-testid="customer_checkout__element-order-total-price"
          >
            Total:
            {' '}
            R$
            {' '}
            {getTotal().toFixed(2).toString().replace('.', ',')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
