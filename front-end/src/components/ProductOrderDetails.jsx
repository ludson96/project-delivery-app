import React from 'react';
import PropTypes from 'prop-types';

function ProductsOrderDetails({ removeOrderProduct, products }) {
  return (
    <ul className="card-checkout">
      {products[0] ? products.map((product) => (
        <li key={ product.id }>
          <div
            data-testid={
              `customer_checkout__element-order-table-item-number-${product.id}`
            }
          >
            {product.id}
          </div>
          <h3
            data-testid={ `customer_checkout__element-order-table-name-${product.id}` }
          >
            {product.title}
          </h3>
          <h3
            data-testid={
              `customer_checkout__element-order-table-quantity-${product.id}`
            }
          >
            {product.quantity}

          </h3>
          <h3
            data-testid={
              `customer_checkout__element-order-table-unit-price-${product.id}`
            }
          >
            R$
            {product.price}
          </h3>
          <h3
            data-testid={
              `customer_checkout__element-order-table-sub-total-${product.id}`
            }
          >
            R$
            {product.price * product.quantity}
          </h3>
          <button
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
