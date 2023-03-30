import React, { FC } from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import placeholder from '../../../../assets/pfps/placeholder.jpg'
import { User } from '../../../../types/types'
import FollowButton from '../../../common/Buttons/FollowButton/FollowButton'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { followInUsers, unfollowInUsers } from '../../../../redux/users-reducer/users-reducer'
import { getFollowQueue } from '../../../../redux/users-reducer/users-selector'

type UserItemProps = {
  user: User
  index: number
  self: User[]
}
const UserItem: FC<UserItemProps> = ({ user, index, self }) => {
  const dispatch = useAppDispatch()
  const followQueue = useAppSelector(getFollowQueue)

  return (
    <div
      key={user.id}
      className={cn(
        `flex justify-between items-center
                my-2 p-4`,
        { 'border-b border-onNeutralBg': index !== self.length - 1 },
      )}
    >
      <NavLink to={'/profile/' + (user.uniqueUrlName || user.id)} className='flex'>
        <img
          src={user.photos.small || placeholder}
          alt='userPfp'
          className='rounded-full 
            w-20 h-20
            p-0.5
              transition-colors hover:bg-neutral-900'
        />

        <div className='mt-3 ml-3 flex flex-col'>
          <div className='text-xl border-b border-transparent'>{user.name}</div>
          <div className='font-normal border-b border-transparent'>{user.status}</div>
        </div>
      </NavLink>

      <FollowButton
        id={user.id}
        followed={user.followed}
        onFollow={() => dispatch(followInUsers(user.id))}
        onUnfollow={() => dispatch(unfollowInUsers(user.id))}
        checkIsDisabled={(id) => followQueue.some((elem: number) => elem === id)}
      />
    </div>
  )
}

export default UserItem
