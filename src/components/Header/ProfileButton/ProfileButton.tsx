import React, { LegacyRef, useState } from 'react'
import cn from 'classnames'

import { getMyData } from '../../../redux/profile-reducer/profile-selector'
import { getIsLoggedIn, getLogin } from '../../../redux/auth-reducer/auth-selector'
import { logout } from '../../../redux/auth-reducer/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

import placeholder from '../../../assets/pfps/placeholder.jpg'
import useTagBlur from '../../../hooks/useTagBlur'

import PrimaryButton, { ButtonColor } from '../../common/Buttons/PrimaryButton/PrimaryButton'

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
              transition-colors hover:bg-primaryBg'
            />
          </button>

          <div
            className={cn(
              `fixed right-2 top-16
                flex flex-col
                bg-neutralBg p-8
                border-x border-b border-onNeutralBg
                rounded-b-lg
                font-semibold 
                transition-opacity`,
              { 'opacity-0 pointer-events-none': !showProfileData },
              { 'opacity-100 ': showProfileData },
            )}
            ref={profileDataRef as LegacyRef<HTMLDivElement>}
          >
            <>
              <div className='font-semibold sm:text-lg lg:text-base'>{login}</div>
              <PrimaryButton
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
                color={ButtonColor.rose}
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
        <PrimaryButton to={'/login'} as='navlink' className='px-2 py-1'>
          Log in
        </PrimaryButton>
      )}
    </div>
  )
}

export default ProfileButton
