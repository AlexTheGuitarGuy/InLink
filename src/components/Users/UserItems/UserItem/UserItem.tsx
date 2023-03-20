import React, { FC } from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import placeholder from '../../../../assets/pfps/placeholder.jpg'
import { User } from '../../../../types/types'
import FollowButton from '../../../common/Buttons/FollowButton/FollowButton'
import { useAppDispatch } from '../../../../hooks/reduxHooks'
import { followInUsers, unfollowInUsers } from '../../../../redux/users-reducer/users-reducer'

type UserItemProps = {
  user: User
  index: number
  self: User[]
}
const UserItem: FC<UserItemProps> = ({ user, index, self }) => {
  const dispatch = useAppDispatch()

  return (
    <div
      key={user.id}
      className={cn(
        `flex justify-between items-center
                my-2 p-4`,
        { 'border-b border-gray-300': index !== self.length - 1 },
      )}
    >
      <NavLink to={'/profile/' + (user.uniqueUrlName || user.id)} className='flex'>
        <img
          src={user.photos.small || placeholder}
          alt='userPfp'
          className='rounded-full 
            lg:w-20 lg:h-20
            sm:w-10 sm:h-10 
            p-0.5
              transition-colors hover:bg-gray-700 active:bg-gray-800'
        />

        <div className='mt-3 ml-3 flex flex-col'>
          <div
            className='lg:text-xl sm:text-sm 
            border-b border-transparent 
            hover:border-gray-600 active:border-gray-500
            hover:text-gray-600 active:text-gray-500'
          >
            {user.name}
          </div>
          <div
            className='font-normal sm:text-sm lg:text-md
                        border-b border-transparent 
            hover:border-gray-600 active:border-gray-500
            hover:text-gray-600 active:text-gray-500'
          >
            {user.status}
          </div>
        </div>
      </NavLink>

      <FollowButton
        id={user.id}
        followed={user.followed}
        onFollow={() => dispatch(followInUsers(user.id))}
        onUnfollow={() => dispatch(unfollowInUsers(user.id))}
      />
    </div>
  )
}

export default UserItem
