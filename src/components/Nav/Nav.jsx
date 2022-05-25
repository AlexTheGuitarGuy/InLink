import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Nav.module.css';
import FriendItems from './FriendItems/FriendItems';

const Nav = ({ state, friends }) => {
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
      <div>
        <FriendItems friends={friends} />
      </div>
    </nav>
  );
};

export default React.memo(Nav);
