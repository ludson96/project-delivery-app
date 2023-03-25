import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import NavBar from '../components/NavBar';
import { httpClient, backendUrl } from '../httpClient';
import context from '../context/myContext';

httpClient.defaults.timeout = 500;

function Products() {
  const {
    totalValue,
  } = useContext(context);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    httpClient.get(backendUrl('products'))
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  return (
    <div className="products">
      <NavBar />
      <div className="cards-container">
        {
          products.map((product) => (
            <CardProduct
              key={ `product-${product.name}` }
              title={ product.name }
              price={ product.price }
              image={ product.urlImage }
              id={ product.id }
            />
          ))
        }
      </div>
      <Link
        to="/customer/checkout"
        className="total-value-bttn"
        style={ totalValue === 0 ? {
          opacity: '0',
        } : {} }
      >
        <button
          type="button"
          disabled={ totalValue === 0 }
          data-testid="customer_products__button-cart"
        >
          Ver Carrinho:
        </button>
        <div>
          <span>R$ </span>
          <span data-testid="customer_products__checkout-bottom-value">
            {`${totalValue.toFixed(2).toString().replace('.', ',')}`}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Products;
