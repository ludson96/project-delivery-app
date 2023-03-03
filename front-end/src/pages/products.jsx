import React, { useEffect, useState } from 'react';
import CardProduct from '../components/CardProduct';
import NavBar from '../components/NavBar';
import { httpClient, backendUrl } from '../httpClient';

httpClient.defaults.timeout = 500;

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    httpClient.get(backendUrl('products'))
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default Products;
