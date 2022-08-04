import { NavLink } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { getNavItems } from '../../../redux/navbar-selector';
import { useSelector } from 'react-redux';

const Nav = () => {
  const navItems = useSelector(getNavItems);

  let navElements = navItems.map((e) => {
    return (
      <div key={e.id}>
        <NavLink
          to={e.to}
          className={({ isActive }) =>
            cn(
              `mr-4 transition-colors
            font-semibold text-lg hover:text-gray-600 active:text-gray-500 
            border-b-2`,
              { 'border-gray-500': isActive },
              {
                'border-b-2 border-transparent hover:border-gray-500':
                  !isActive,
              },
            )
          }
        >
          {e.name}
        </NavLink>
      </div>
    );
  });

  return <nav className="flex flex-row">{navElements}</nav>;
};

export default Nav;
