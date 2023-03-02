import React from 'react';
import DeliveryDetails from '../components/deliveryDetails';
import NavBar from '../components/NavBar';
import SaleDetails from '../components/orderDatails';

function Checkout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div>
        <SaleDetails />
        <DeliveryDetails />
      </div>
    </>

  );
}

export default Checkout;
