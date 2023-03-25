import React from 'react';
import PropTypes from 'prop-types';
import ProductsOrderDetails from './ProductOrderDetails';

const statusTestID = [
  'customer_order_details__element-order-details-label-delivery-status'];
function SaleDetailsBox({ products, sale }) {
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
      <div>
        <h1 data-testid="customer_order_details__element-order-details-label-order-id">
          PEDIDO
          {' '}
          {sale.id || 0}
          ;
        </h1>
        <h1 data-testid="customer_order_details__element-order-details-label-seller-name">
          P. Vend: Fulana Pereira

        </h1>
        <h1
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {(((sale.saleDate) || 'T').split('T')[0]).replaceAll('-', '/')
            .split('/').reverse().join('/')}

        </h1>
        <h1
          data-testid={ `${statusTestID[0]}${sale.id}` }
        >
          {sale.status || 'pendente'}

        </h1>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ (sale.status !== 'chegando') }
        >
          marcar como entregue
        </button>
      </div>
      <div>
        <ProductsOrderDetails
          products={ products }
          removeOrderProduct={ false }
        />
        <div className="total-check-container">
          <div
            className="total-checkout"
            data-testid="customer_order_details__element-order-total-price"
          >
            Total:
            {' '}
            R$
            {' '}
            {getTotal(products).toFixed(2).toString().replace('.', ',') || 0}
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
  sale: PropTypes.shape({
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SaleDetailsBox;
