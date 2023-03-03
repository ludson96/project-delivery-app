import React from 'react';
import DeliveryDetails from '../components/deliveryDetails';
import NavBar from '../components/NavBar';
import OrderDetails from '../components/orderDatails';

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
