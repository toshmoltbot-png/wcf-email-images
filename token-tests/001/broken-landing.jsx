// BROKEN React Landing Page Component - The Daily Token Test #001
// This component has 4 bugs. Fix them all.

import React, { useState, useEffect } from 'react';

function LandingPage({ products }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Bug 1: Dependency array issue causes infinite re-render
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotal(newTotal);
  });

  // Bug 2: Mutates state directly instead of creating new array
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
      setCart(cart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Bug 3: Does not prevent default form submission
  const handleSubmit = (e) => {
    if (email.includes('@')) {
      setSubmitted(true);
    }
  };

  // Bug 4: Key prop uses array index, causing rendering issues on reorder
  return (
    <div className="landing">
      <h1>Shop</h1>
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
      <div className="cart">
        <h2>Cart ({cart.length} items) - ${total.toFixed(2)}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Get updates"
        />
        <button type="submit">{submitted ? 'Subscribed!' : 'Subscribe'}</button>
      </form>
    </div>
  );
}

export default LandingPage;
