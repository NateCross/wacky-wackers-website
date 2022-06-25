import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function handleNavClick() {
  window.alert("Hi!");
}

const LeftNavbar = (props: {}) => {
  return (
    <nav>
      <button
        className="nav-hamburger"
        onClick={handleNavClick}
        title="Navigation"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      <div className="nav-items">
        <ul>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/about">About The Company</Link></li>
          <li><Link to="/special-order">Make A Very Special Order</Link></li>
        </ul>
      </div>
    </nav>
  );
};

const RightNavbar = (props: {}) => {
  return (
    <h1>Hello World</h1>
  );
};

export { LeftNavbar, RightNavbar };
