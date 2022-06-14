import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Nav.module.css';
import FriendItems from './FriendItems/FriendItems';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../redux/auth-selector';

const Nav = ({ state, friends, isLoggedIn }) => {
  let navElements = state.navItems.map((e) => {
    return (
      <div key={e.id} className={s.navText}>
        <NavLink
          to={e.to}
          className={(navData) =>
            navData.isActive ? s.active : s.item
          }
        >
          {e.name}
        </NavLink>
      </div>
    );
  });

  return (
    <nav className={s.nav}>
      {navElements}
      {isLoggedIn && <FriendItems friends={friends} />}
    </nav>
  );
};

const mstp = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default compose(memo, connect(mstp, null))(Nav);
