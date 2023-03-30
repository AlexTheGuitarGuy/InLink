import React, { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import { User } from '../../../types/types'
import Placeholder from '../../../assets/pfps/placeholder.jpg'

type UsersProps = {
  users: User[]
}

const Users: FC<UsersProps> = ({ users }) => {
  const userElements = users.map(({ name, photos }, index) => {
    return (
      <div key={name} className='sm:border-b sm:border-neutral-200 lg:border-none'>
        <NavLink
          to={`/messages/${index}`}
          className={({ isActive }) =>
            cn(
              `p-2 flex items-center mt-4
              transition-colors
              border-b-2
              hover:bg-neutral-200 active:bg-neutral-300
              hover:text-neutral-600 active:text-neutral-700
              hover:border-neutral-400 active:border-neutral-500
            `,
              {
                'bg-neutral-300 text-neutral-700 border-neutral-500': isActive,
              },
            )
          }
        >
          <img
            src={photos.small || Placeholder}
            alt={name}
            className='h-16 w-16 
                        rounded-full'
          />
          <div
            className='sm:ml-8 lg:ml-4 
                      sm:text-md lg:text-sm'
          >
            {name}
          </div>
        </NavLink>
      </div>
    )
  })

  return (
    <div className='lg:border-r lg:border-neutral-300 lg:w-1/5 sm:w-full'>
      <div
        className='text-xl
                  sm:text-center lg:text-left
                  sm:m-4 lg:m-0'
      >
        Messages
      </div>
      <div className='sm:mx-8 sm:mt-4 lg:m-0'>{userElements}</div>
    </div>
  )
}

export default memo(Users)
