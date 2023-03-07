import React from 'react';
import ProductsOrderDetails from './ProductOrderDetails';

function SaleDetailsBox({ products }) {
  return (
    <div>
      <h1>Detalhe do pedido</h1>
      <div>
        <ProductsOrderDetails
          products={ products }
          removeOrderProduct={ false }
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

export default SaleDetailsBox;
