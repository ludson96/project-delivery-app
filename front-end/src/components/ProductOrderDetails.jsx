import React from 'react';
import PropTypes from 'prop-types';

function ProductsOrderDetails({ removeOrderProduct, products }) {
  const rota = removeOrderProduct ? 'checkout' : 'order_details';
  const removerBtn = (product, i) => (
    <button
      className="item-checkout-6 card-item"
      data-testid={ `customer_${rota}__element-order-table-remove-${i}` }
      type="button"
      onClick={ () => removeOrderProduct(product) }
    >
      {' '}
      Remover
    </button>);

  return (
    <ul className="card-checkout">
      {products[0] ? products.map((product, i) => (
        <li key={ product.id } className="card">
          <div
            className="item-checkout-1 card-item"
            data-testid={
              `customer_${rota}__element-order-table-item-number-${i}`
            }
          >
            {i + 1}
          </div>
          <h3
            className="item-checkout-2 card-item"
            data-testid={ `customer_${rota}__element-order-table-name-${i}` }
          >
            {product.title}
          </h3>
          <h3
            className="item-checkout-3 card-item"
            data-testid={
              `customer_${rota}__element-order-table-quantity-${i}`
            }
          >
            {product.quantity}

          </h3>
          <h3
            className="item-checkout-4 card-item"
            data-testid={
              `customer_${rota}__element-order-table-unit-price-${i}`
            }
          >
            R$
            {' '}
            {Number(product.price).toFixed(2).toString().replace('.', ',')}
          </h3>
          <h3
            className="item-checkout-5 card-item"
            data-testid={
              `customer_${rota}__element-order-table-sub-total-${i}`
            }
          >
            R$
            {' '}
            {
              (Number(product.price) * product.quantity)
                .toFixed(2).toString().replace('.', ',')
            }
          </h3>
          {
            removeOrderProduct
            && removerBtn(product, i)
          }
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
