import React from 'react';
import ProductsOrderDetails from './productOrderDetails';
import helpers from '../helpers';

const { getTotal } = helpers;

function OrderDetails() {
  const removeOrderProduct = () => {};
  return (
    <>
      <h1>Finalizar Pedido</h1>
      <div>
        <ProductsOrderDetails removeOrderProduct={ removeOrderProduct } />
        <div>
          Total:
          {getTotal()}
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
