import { KeyboardBackspace } from '@mui/icons-material'
import { NavLink, useLocation } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import ProfileButton from './ProfileButton/ProfileButton'

import Placeholder from '../../assets/pfps/placeholder.jpg'
import useScreenSize from '../../hooks/useScreenSize'
import { getFrontPageFriends } from '../../redux/users-reducer/users-selector'
import ThemesMenu from './ThemesMenu/ThemesMenu'
import { useAppSelector } from 'hooks/reduxHooks'

const Header = () => {
  const location = useLocation()
  const users = useAppSelector(getFrontPageFriends)
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
        className={`px-4 bg-neutralBg
        rounded-b border-b border-onNeutralBg
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
          role='navigation'
          className='order-3
        lg:text-4xl sm:text-2xl font-semibold
        hover:opacity-90 active:opacity-70
        transition-opacity'
        >
          <NavLink to={'/'}>InLink</NavLink>
        </div>
      </header>
    )
  }

  return (
    <header
      className='px-4 bg-neutralBg
        rounded-b border-b border-onNeutralBg
        flex justify-between items-center 
        whitespace-nowrap
        h-16'
    >
      <div className='lg:order-3 sm:order-3 flex space-x-3'>
        <ThemesMenu />
        <ProfileButton />
      </div>

      <div className='lg:order-2 sm:order-1'>
        <Navbar />
      </div>

      <div
        role='navigation'
        className='lg:order-1 sm:order-2
        lg:text-4xl sm:text-2xl font-semibold
        hover:opacity-90 active:opacity-70
        transition-opacity'
      >
        <NavLink to={'/'}>InLink</NavLink>
      </div>
    </header>
  )
}

export default Header
