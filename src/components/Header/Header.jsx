import React from 'react';
import s from './Header.module.css';
import logo from './logo.jpg';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.login}>
        {props.isLoggedIn ? (
          props.login
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
      <NavLink to={'/'}>
        <img src={logo} alt="logo" />
      </NavLink>
    </header>
  );
};

export default Header;
