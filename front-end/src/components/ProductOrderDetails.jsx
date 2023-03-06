import React from 'react';
import PropTypes from 'prop-types';

function ProductsOrderDetails({ removeOrderProduct, products }) {
  return (
    <ul className="card-checkout">
      {products[0] ? products.map((product, i) => (
        <li key={ product.id } className="card">
          <div
            className="item-checkout-1 card-item"
            data-testid={
              `customer_checkout__element-order-table-item-number-${product.id}`
            }
          >
            {i + 1}
          </div>
          <h3
            className="item-checkout-2 card-item"
            data-testid={ `customer_checkout__element-order-table-name-${product.id}` }
          >
            {product.title}
          </h3>
          <h3
            className="item-checkout-3 card-item"
            data-testid={
              `customer_checkout__element-order-table-quantity-${product.id}`
            }
          >
            {product.quantity}

          </h3>
          <h3
            className="item-checkout-4 card-item"
            data-testid={
              `customer_checkout__element-order-table-unit-price-${product.id}`
            }
          >
            R$
            {' '}
            {Number(product.price).toFixed(2).toString().replace('.', ',')}
          </h3>
          <h3
            className="item-checkout-5 card-item"
            data-testid={
              `customer_checkout__element-order-table-sub-total-${product.id}`
            }
          >
            R$
            {' '}
            {(product.price * product.quantity).toFixed(2).toString().replace('.', ',')}
          </h3>
          <button
            className="item-checkout-6 card-item"
            data-testid={ `customer_checkout__element-order-table-remove-${product.id}` }
            type="button"
            onClick={ () => removeOrderProduct(product) }
          >
            Remover
          </button>
        </li>
      ))
        : <>Não foi adicionado nenhum produto</>}
    </ul>
  );
}

ProductsOrderDetails.propTypes = {
  removeOrderProduct: PropTypes.func.isRequired,
  products: PropTypes.shape([]).isRequired,
};

export default ProductsOrderDetails;
