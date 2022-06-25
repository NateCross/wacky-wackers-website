import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

import { LeftNavbar, RightNavbar } from '../components/Navbar';

function Logo (props: {}) {
  return (
    <Link to="/" title="Wacky Wackers">
      {/* <img src={logo} alt="Wacky Wackers Logo" title="Wacky Wackers Logo" className="logo" /> */}
      <div className="logo"></div>
    </Link>
  );
}

const Header = (props: {}) => {
  return (
    <header>
      <LeftNavbar />
      <Logo />
      <RightNavbar />
    </header>
  );
};

export default Header;
