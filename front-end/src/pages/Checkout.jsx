import React from 'react';
import DeliveryDetails from '../components/DeliveryDetails';
import NavBar from '../components/NavBar';
import OrderDetails from '../components/OrderDatails';

function Checkout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div>
        <OrderDetails />
        <DeliveryDetails />
      </div>
    </>

  );
}

export default Checkout;
