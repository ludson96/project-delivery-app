import React from 'react';
import PropTypes from 'prop-types';
import ProductsOrderDetails from './ProductOrderDetails';

function SaleDetailsBox({ products }) {
  const getTotal = (saleProducts) => {
    const total = saleProducts.reduce(
      (
        accomulator,
        product,
      ) => accomulator + (Number(product.price) * Number(product.quantity)),
      0,
    );
    return total;
  };
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
            {getTotal(products).toFixed(2).toString().replace('.', ',')}
          </div>
        </div>
      </div>
    </div>
  );
}

SaleDetailsBox.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default SaleDetailsBox;
