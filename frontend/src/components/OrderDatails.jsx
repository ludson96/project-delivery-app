import React, { useState, useContext } from 'react';
import ProductsOrderDetails from './ProductOrderDetails';
import helpers from '../helpers';
import context from '../context/myContext';

const { getTotal, getCartProducts } = helpers;
function OrderDetails() {
  const {
    setAllProducts,
  } = useContext(context);

  const [products, setProducts] = useState(getCartProducts());
  const removeOrderProduct = (product) => {
    const actProducts = JSON.parse(localStorage.getItem('carrinho'));

    setAllProducts(
      actProducts.filter((currProduct) => product.title !== currProduct.title),
    );
    setProducts(getCartProducts());
  };

  return (
    <div className="order-details">
      <h1>Finalizar Pedido</h1>
      <div>
        <ProductsOrderDetails
          products={ products }
          removeOrderProduct={ removeOrderProduct }
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

export default OrderDetails;
