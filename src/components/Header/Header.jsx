import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton/ProfileButton';
import Nav from './Nav/Nav';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { useSelector } from 'react-redux';
import { getDialogsPage } from '../../redux/dialogs-selector';
import useScreenSize from '../../hooks/useScreenSize';

const Header = () => {
  const location = useLocation();
  const { users } = useSelector(getDialogsPage);
  const screenSize = useScreenSize();

  if (!users) return null;

  if (
    location.pathname.match('/messages') &&
    !location.pathname.match('/messages/all') &&
    screenSize.dynamicWidth <= 720
  ) {
    const currentDialogUser = users[location.pathname[location.pathname.length - 1] - 1];

    if (!currentDialogUser) return null;

    return (
      <header
        className={`px-4 bg-gray-100 text-gray-700
        rounded-b border-b border-gray-400
        flex justify-between items-center 
        whitespace-nowrap
        h-16`}
      >
        <div className="order-1 flex">
          <NavLink to={'messages/all'}>
            <img src={require('../../assets/go-back.png')} alt="go back" className="w-10 h-10" />
          </NavLink>

          <img
            src={require(`../../assets/pfps/u${currentDialogUser.id}.jpg`)}
            alt={`user ${currentDialogUser.id}`}
            className="h-12 w-12
                        ml-4
                        rounded-full"
          />

          <div className="text-xl mt-2 ml-2">{currentDialogUser.name}</div>
        </div>
        <div
          className="order-3
        text-4xl font-semibold
        hover:text-gray-600 active:text-gray-500
        transition-colors"
        >
          <NavLink to={'/'}>InLink</NavLink>
        </div>
      </header>
    );
  }

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
