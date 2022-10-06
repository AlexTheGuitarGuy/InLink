import React, { LegacyRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { getMyData } from '../../../redux/profile-reducer/profile-selector'
import { getIsLoggedIn, getLogin } from '../../../redux/auth-reducer/auth-selector'
import { logout } from '../../../redux/auth-reducer/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

import placeholder from '../../../assets/pfps/placeholder.jpg'
import useTagBlur from '../../../hooks/useTagBlur'

import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'

const ProfileButton = () => {
  const [showProfileData, setShowProfileData] = useState(false)

  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const login = useAppSelector(getLogin)
  const myData = useAppSelector(getMyData)

  const dispatch = useAppDispatch()

  const profileDataRef = useTagBlur(showProfileData, setShowProfileData)

  if (!myData && isLoggedIn) return null

  const handleLogout = () => {
    setShowProfileData(false)

    dispatch(logout())
  }

  return (
    <div className='flex flex-col'>
      {isLoggedIn ? (
        <>
          <button onClick={() => setShowProfileData(!showProfileData)} className='rounded-full'>
            <img
              src={myData?.photos?.small || placeholder}
              alt='pfp'
              className='rounded-full w-12 h-12 p-0.5
              transition-colors hover:bg-gray-700 active:bg-gray-800'
            />
          </button>

          <div
            className={cn(
              `fixed right-2 top-16
                flex flex-col
                bg-gray-200 p-8
                border-x border-b border-gray-400
                rounded-b-lg
                font-semibold 
                transition-opacity`,
              { 'opacity-0 pointer-events-none': !showProfileData },
              { 'opacity-100 ': showProfileData },
            )}
            ref={profileDataRef as LegacyRef<HTMLDivElement>}
          >
            <>
              <div className='font-semibold text-gray-700 sm:text-lg lg:text-base'>{login}</div>
              <PrimaryButton
                color='gray'
                as='navlink'
                to='/profile'
                className='lg:py-0.5 lg:px-4 
                              sm:py-2 sm:px-6
                              lg:mt-2 sm:mt-4 
                              text-center'
              >
                Go to profile
              </PrimaryButton>
              <PrimaryButton
                color='rose'
                onClick={handleLogout}
                className='lg:py-0.5 lg:px-4 
                              sm:py-2 sm:px-6
                              lg:mt-2 sm:mt-4 
                              text-center'
              >
                Log out
              </PrimaryButton>
            </>
          </div>
        </>
      ) : (
        <NavLink
          to={'/login'}
          className='font-semibold
            bg-gray-500 hover:bg-gray-600 active:bg-gray-700
            py-1 px-4 text-gray-100 text-center
            rounded
            transition-colors cursor-pointer'
        >
          Log in
        </NavLink>
      )}
    </div>
  )
}

export default ProfileButton
