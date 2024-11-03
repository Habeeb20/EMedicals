
import React, { useEffect, useState } from 'react';
import { fetchCartItems } from '../../components/pharmcay/ApiService';
import CartItem from '../../components/pharmcay/CartItem';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = async () => {
      const response = await fetchCartItems();
      setCartItems(response.data);
    };
    loadCartItems();
  }, []);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.drug._id !== id));
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <CartItem key={item.drug._id} item={item} onRemove={handleRemove} />
      ))}
    </div>
  );
};

export default CartPage;
