import React from 'react';
import s from './Header.module.css';
import logo from '../../assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer';
import { connect } from 'react-redux';

const Header = (props) => {
  const logout = () => {
    props.logout();
  };

  return (
    <header className={s.header}>
      <div className={s.login}>
        {props.isLoggedIn ? (
          <div>
            <span className={s.username}>{props.login}</span>
            <div>
              <button onClick={logout} className={s.logout}>
                Log out
              </button>
            </div>
          </div>
        ) : (
          <NavLink to={'/login'}>
            <button>Log in</button>
          </NavLink>
        )}
      </div>
      <NavLink to={'/'}>
        <img src={logo} alt="logo" />
      </NavLink>
    </header>
  );
};

export default connect(null, { logout })(Header);
