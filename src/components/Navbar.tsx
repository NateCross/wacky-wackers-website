import React from 'react';

export default((props : {}) => {
  return (
    <nav>
      <button className="nav-hamburger">

      </button>

      <div className="nav-items">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/about">About The Company</a></li>
          <li><a href="/special-order">Make A Very Special Order</a></li>
        </ul>
      </div>
    </nav>
  )
})
