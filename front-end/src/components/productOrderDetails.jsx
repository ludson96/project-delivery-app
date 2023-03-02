import React from 'react';
import PropTypes from 'prop-types';

function ProductsOrderDetails({ removeOrderProduct, products }) {
  return (
    <ul>
      {products[0] ? products.map((product, index) => (
        <li key={ product.name }>
          <div
            data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
          >
            {index}
          </div>
          <h3
            data-testid={ `customer_checkout__element-order-table-name-${index}` }
          >
            {product.name}
          </h3>
          <h3
            data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
          >
            {product.quantity}

          </h3>
          <h3
            data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
          >
            R$
            {product.value}
          </h3>
          <h3
            data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
          >
            R$
            {product.value * product.quantity}
          </h3>
          <button
            data-testid={ `customer_checkout__element-order-table-remove-${index}` }
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
