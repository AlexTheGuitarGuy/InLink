import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import s from './Header.module.css';
import cn from 'classnames';
import LoginButton from './LoginButton/LoginButton';

const Header = (props) => {
  return (
    <header
      className={cn(
        s.header,
        `p-2 bg-gray-300 text-gray-700
        rounded-b
        flex justify-between items-center 
        whitespace-nowrap`,
      )}
    >
      <div className={'order-2'}>
        <LoginButton {...props} />
      </div>

      <div
        className="order-1 text-5xl
      font-semibold hover:text-gray-600 active:text-gray-500 transition-colors"
      >
        <NavLink to={'/'}>InLink</NavLink>
      </div>
    </header>
  );
};

export default connect(null, { logout })(Header);
