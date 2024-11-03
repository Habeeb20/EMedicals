// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { checkout } from '../../components/pharmcay/ApiService';

const CheckoutPage = () => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleCheckout = async () => {
    await checkout({ address, paymentMethod });
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <label>Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <label>Payment Method</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option>Credit Card</option>
        <option>PayPal</option>
        <option>Cash on Delivery</option>
      </select>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
