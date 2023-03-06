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
        actProducts.filter((currProduct) => product.name !== currProduct.name),
      ),
    );
    setProducts(getCartProducts());
  };

  return (
    <>
      <h1>Finalizar Pedido</h1>
      <div>
        <ProductsOrderDetails
          products={ products }
          removeOrderProduct={ removeOrderProduct }
        />
        <div
          data-testid="customer_checkout__element-order-total-price"
        >
          Total:
          {getTotal()}
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
