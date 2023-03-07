import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import CardOrders from '../components/CardOrders';
import { httpClient, backendUrl } from '../httpClient';

httpClient.defaults.timeout = 500;

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    httpClient.get(backendUrl(`sales:${user.id}`))
      .then((res) => {
        if (!res.data) return;
        setOrders(res.data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        {
          orders.map((order) => (
            <CardOrders
              key={ `order${order.id}` }
              id={ order.id }
              order={ order.sellerId }
              status={ order.status }
              date={ order.saleDate }
              price={ order.totalPrice }
            />
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
