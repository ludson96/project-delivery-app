import React from 'react';
import PropTypes from 'prop-types';
import ProductsOrderDetails from './ProductOrderDetails';

function SaleDetailsBox({ products, sale }) {
  console.log('🚀 ~ file: SaleDetailsBox.jsx:6 ~ SaleDetailsBox ~ sale:', sale);
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
          {sale.id}
          ;
        </h1>
        <h1 data-testid="customer_order_details__element-order-details-label-seller-name">
          P. Vend: Fulana Pereira

        </h1>
        <h1
          data-testid={ () => `
          Group customer_order_details__element-order-details-label-order-date
          ` }
        >
          {sale.saleDate.split('T')[0].replaceAll('-', '/')}

        </h1>
        <h1
          data-testid={
            `
            customer_order_details__element-order-details-label-delivery-status${sale.id}`
          }
        >
          {sale.status}

        </h1>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
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
  sale: PropTypes.shape({
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SaleDetailsBox;
