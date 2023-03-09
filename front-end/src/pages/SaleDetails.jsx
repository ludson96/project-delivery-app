import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import SaleDetailsBox from '../components/SaleDetailsBox';
import { getMineSales } from '../httpClient';

function SaleDetails() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  console.log('🚀 ~ file: SaleDetails.jsx:12 ~ SaleDetails ~ id :', id);
  useEffect(() => {
    const getProducts = async () => {
      const { sales } = await getMineSales();
      console.log(sales);
      const correctSale = sales.filter((sale) => sale.id === Number(id))[0];
      const r = correctSale.SalesProducts.map((product) => (
        {
          ...product.Product,
          quantity: product.quantity,
          title: product.Product.name,
        }
      ));
      console.log(r);
      setProducts(r);
    };
    getProducts();
  }, [id]);

  return (
    <div className="sale-details">
      <NavBar />
      <SaleDetailsBox products={ products } />
    </div>
  );
}

export default SaleDetails;
