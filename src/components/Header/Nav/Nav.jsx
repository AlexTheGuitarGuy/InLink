import { NavLink } from 'react-router-dom';
import React from 'react';

const Nav = ({ navItems }) => {
  let navElements = navItems.map((e) => {
    return (
      <div
        key={e.id}
        className={`mr-4 font-semibold text-lg
        hover:text-gray-600 active:text-gray-500 transition-colors
        border-b-2 border-transparent hover:border-gray-500`}
      >
        <NavLink to={e.to}>{e.name}</NavLink>
      </div>
    );
  });

  return <nav className="flex flex-row">{navElements}</nav>;
};

export default Nav;
