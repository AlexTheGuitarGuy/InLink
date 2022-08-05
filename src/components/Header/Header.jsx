import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton/ProfileButton';
import Nav from './Nav/Nav';
import { compose } from 'redux';

const Header = () => {
  return (
    <header
      className={`px-4 bg-gray-100 text-gray-700
        rounded-b border-b border-gray-400
        flex justify-between items-center 
        whitespace-nowrap
        h-16`}
    >
      <div className={'lg:order-3 sm:order-3'}>
        <ProfileButton />
      </div>

      <div className={'lg:order-2 sm:order-1'}>
        <Nav />
      </div>

      <div
        className="lg:order-1 sm:order-2
        text-4xl font-semibold
        hover:text-gray-600 active:text-gray-500
        transition-colors"
      >
        <NavLink to={'/'}>InLink</NavLink>
      </div>
    </header>
  );
};

export default compose(memo)(Header);
