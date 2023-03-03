import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardProduct from '../components/CardProduct';
import NavBar from '../components/NavBar';
import helpers from '../helpers';

const { backendUrl } = helpers;
const httpClient = axios.create();

httpClient.defaults.timeout = 500;

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    httpClient.get(`${backendUrl}products`)
      .then((res) => {
        // console.log(res.data);
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
