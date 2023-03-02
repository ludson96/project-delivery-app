import React from 'react';
import ProductsOrderDetails from './productOrderDetails';
import helpers from '../helpers';

const { getTotal } = helpers;
function OrderDetails() {
  const removeOrderProduct = (product) => {
    const products = JSON.parse(localStorage.getItem('orderProducts'));
    localStorage.setItem(
      'orderProducts',
      JSON.stringify(
        products.filter((currProduct) => product.name !== currProduct.name),
      ),
    );
  };

  return (
    <>
      <h1>Finalizar Pedido</h1>
      <div>
        <ProductsOrderDetails removeOrderProduct={ removeOrderProduct } />
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
