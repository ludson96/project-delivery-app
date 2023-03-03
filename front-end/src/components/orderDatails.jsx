import React, { useState } from 'react';
import ProductsOrderDetails from './productOrderDetails';
import helpers from '../helpers';

const { getTotal, getOrderProducts } = helpers;
function OrderDetails() {
  const [products, setProducts] = useState(getOrderProducts());
  const removeOrderProduct = (product) => {
    const actProducts = JSON.parse(localStorage.getItem('orderProducts'));
    localStorage.setItem(
      'orderProducts',
      JSON.stringify(
        actProducts.filter((currProduct) => product.name !== currProduct.name),
      ),
    );
    setProducts(getOrderProducts());
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
