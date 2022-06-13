import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer';
import { connect } from 'react-redux';

const Header = ({ logout, login, isLoggedIn }) => {
  return (
    <header className={s.header}>
      <div className={s.login}>
        {isLoggedIn ? (
          <div>
            <span className={s.username}>{login}</span>
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
        <span className="self-center ml-2 text-5xl font-semibold whitespace-nowrap text-white">
          InLink
        </span>
      </NavLink>
    </header>
  );
};

export default connect(null, { logout })(Header);
