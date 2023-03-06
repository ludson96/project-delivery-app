import React from 'react';
import DeliveryDetails from '../components/DeliveryDetails';
import NavBar from '../components/NavBar';
import OrderDetails from '../components/OrderDatails';

function Checkout() {
  return (
    <div className="checkout">
      <NavBar />
      <div className="checkout-details">
        <OrderDetails />
        <DeliveryDetails />
      </div>
    </div>

  );
}

export default Checkout;
