import { NavLink } from 'react-router-dom'
import React, { LegacyRef, useState } from 'react'
import cn from 'classnames'
import { Menu } from '@mui/icons-material'

import useTagBlur from '../../../hooks/useTagBlur'
import { useLocation } from 'react-router'
import useScreenSize from '../../../hooks/useScreenSize'
import { NavItem } from '../../../types/types'

const Navbar = () => {
  const navItems: NavItem[] = [
    { to: '/profile', name: 'Profile' },
    { to: '/messages', name: 'Messages' },
    { to: '/users', name: 'Users' },
  ]
  const [shouldShowMenu, setShouldShowMenu] = useState(false)

  const menuRef = useTagBlur(shouldShowMenu, setShouldShowMenu)
  const screenSize = useScreenSize()

  const location = useLocation()

  let navElements = navItems.map((navItem: NavItem) => {
    let isActive = false
    if (location.pathname.match(navItem.to)) isActive = true
    return (
      <NavLink
        key={navItem.name}
        to={navItem.to}
        className='sm:mb-3 lg:mb-0'
        onClick={() => {
          setShouldShowMenu(false)
        }}
      >
        <div
          className={cn(
            `
            transition-colors
            font-semibold 
            
            lg:text-lg sm:text-2xl
            lg:hover:bg-transparent
            lg:p-0 lg:mr-4 lg:rounded-none
            lg:border-b-2
                        
            sm:active:bg-neutralFocus
            sm:px-2 sm:py-1 
            sm:rounded 
            sm:w-full
            sm:text-center
            `,
            {
              'lg:border-onNeutralBg lg:bg-transparent bg-neutralChild': isActive,
              'lg:border-transparent lg:hover:border-neutralChild': !isActive,
            },
          )}
        >
          {navItem.name}
        </div>
      </NavLink>
    )
  })

  if (screenSize.dynamicWidth < 1366) {
    return (
      <div>
        <button
          onClick={() => setShouldShowMenu(!shouldShowMenu)}
          className={cn('rounded p-1', {
            'bg-neutralChild': shouldShowMenu,
          })}
        >
          <Menu fontSize='large' />
        </button>

        <nav>
          <div
            className={cn(
              `fixed left-0 top-16
                flex flex-col justify-center
                w-full
                bg-neutralBg p-8
                border-b border-onNeutralBg
                rounded-b
                font-semibold
                transition-opacity`,
              { 'opacity-0 pointer-events-none': !shouldShowMenu },
              { 'opacity-100': shouldShowMenu },
            )}
            ref={menuRef as LegacyRef<HTMLDivElement>}
          >
            {navElements}
          </div>
        </nav>
      </div>
    )
  }

  return <nav className='flex flex-row'>{navElements}</nav>
}

export default Navbar
