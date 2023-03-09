import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import CardOrders from '../components/CardOrders';
import { httpClient, getMineSales } from '../httpClient';

httpClient.defaults.timeout = 500;

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const { sales } = await getMineSales();
      setOrders(sales);
    };
    getSales();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        {
          orders.map((order, index) => (
            <CardOrders
              key={ `order${order.id}` }
              id={ order.id }
              sellerId={ order.sellerId }
              status={ order.status }
              date={ (order.saleDate.split('T')[0]).replaceAll('-', '/')
                .split('/').reverse().join('/') }
              price={ order.totalPrice }
              index={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
