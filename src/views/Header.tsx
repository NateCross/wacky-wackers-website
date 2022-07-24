import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

import { LeftNavbar, RightNavbar } from '../components/Navbar';

export interface HeaderProps {
  onLogin: Function,
  // onRegister: Function,
};

function Logo (props: {}) {
  return (
    <Link to="/" title="Wacky Wackers">
      {/* <img src={logo} alt="Wacky Wackers Logo" title="Wacky Wackers Logo" className="logo" /> */}
      <div className="logo"></div>
    </Link>
  );
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <LeftNavbar />
      <Logo />
      <RightNavbar
        onLogin={props.onLogin}
      />
    </header>
  );
};

export default Header;
