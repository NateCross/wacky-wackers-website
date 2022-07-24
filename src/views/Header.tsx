import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

import { LeftNavbar, RightNavbar } from '../components/Navbar';
import User from '../types/User';

export interface HeaderProps {
  onLogin: Function,
  onLogout: Function,
  user: User | undefined,
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
        onLogout={props.onLogout}
        onLogin={props.onLogin}
        user={props.user}
      />
    </header>
  );
};

export default Header;
