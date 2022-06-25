import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import LoginButton from './LoginButton/LoginButton';
import Nav from './Nav/Nav';

const Header = ({ navItems, ...restProps }) => {
  return (
    <header
      className={`px-4 bg-gray-200 text-gray-700
        rounded-b border-b-2 border-gray-400
        flex justify-between items-center 
        whitespace-nowrap
        h-16
        `}
    >
      <div className={'order-3'}>
        <LoginButton {...restProps} />
      </div>

      <div className={'order-2'}>
        <Nav navItems={navItems} />
      </div>

      <div
        className="order-1 text-4xl
      font-semibold hover:text-gray-600 active:text-gray-500 transition-colors"
      >
        <NavLink to={'/'}>InLink</NavLink>
      </div>
    </header>
  );
};

export default connect(null, { logout })(Header);
