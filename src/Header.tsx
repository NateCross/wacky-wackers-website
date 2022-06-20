import React from 'react';
import logo from './imgs/wack-logo.png';
import './css/Header.css';

import Navbar from './components/Navbar';

export default ((props : {}) => {
  return (
    <header>
      <a href="/">
        <img src={logo} alt="Wacky Wackers Logo" title="Wacky Wackers Logo" className="logo" />
      </a>
      <Navbar />
    </header>
  );
});
