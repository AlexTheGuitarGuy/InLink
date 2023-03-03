import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton/ProfileButton'
import Nav from './Nav/Nav'
import { useLocation } from 'react-router-dom'
import { compose } from 'redux'
import { useSelector } from 'react-redux'
import { KeyboardBackspace } from '@mui/icons-material'

import { getFrontPageFriends } from '../../redux/users-reducer/users-selector'
import useScreenSize from '../../hooks/useScreenSize'
import Placeholder from '../../assets/pfps/placeholder.jpg'

const Header = () => {
  const location = useLocation()
  const users = useSelector(getFrontPageFriends)
  const screenSize = useScreenSize()

  if (!users) return null

  if (
    location.pathname.match('/messages') &&
    !location.pathname.match('/messages/all') &&
    screenSize.dynamicWidth < 1366
  ) {
    const currentDialogUser = users[+location.pathname[location.pathname.length - 1]]

    if (!currentDialogUser) return null

    return (
      <header
        className={`px-4 bg-gray-100 text-gray-700
        rounded-b border-b border-gray-400
        flex justify-between items-center 
        whitespace-nowrap
        h-16`}
      >
        <div className='order-1 flex'>
          <NavLink to={'messages/all'} className='mt-1.5'>
            <KeyboardBackspace fontSize='medium' />
          </NavLink>

          <img
            src={currentDialogUser.photos.small || Placeholder}
            alt={currentDialogUser.name}
            className='h-8 w-8 mt-2
                        ml-4
                        rounded-full'
          />

          <div className='text-md mt-2 ml-2'>{currentDialogUser.name}</div>
        </div>
        <div
          className='order-3
        lg:text-4xl sm:text-2xl font-semibold
        hover:text-gray-600 active:text-gray-500
        transition-colors'
        >
          <NavLink to={'/'}>InLink</NavLink>
        </div>
      </header>
    )
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
        className='lg:order-1 sm:order-2
        lg:text-4xl sm:text-2xl font-semibold
        hover:text-gray-600 active:text-gray-500
        transition-colors'
      >
        <NavLink to={'/'}>InLink</NavLink>
      </div>
    </header>
  )
}

export default compose(memo)(Header)
