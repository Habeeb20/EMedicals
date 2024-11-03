
import React from 'react';

const CartItem = ({ item, onRemove }) => (
  <div className="cart-item">
    <h4>{item.drug.name}</h4>
    <p>Quantity: {item.quantity}</p>
    <p>Price: ${item.drug.price}</p>
    <button onClick={() => onRemove(item.drug._id)}>Remove</button>
  </div>
);

export default CartItem;
