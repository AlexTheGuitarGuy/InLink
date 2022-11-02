import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { getFollowQueue, getUsers } from '../../../redux/users-reducer/users-selector'
import { follow, unfollow } from '../../../redux/users-reducer/users-reducer'

import { getUID } from '../../../redux/auth-reducer/auth-selector'
import { User } from '../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

import placeholder from '../../../assets/pfps/placeholder.jpg'
import Loading from '../../common/Loading/Loading'
import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'

const UserItems = () => {
  const users = useAppSelector(getUsers)
  const followQueue = useAppSelector(getFollowQueue)
  const myUID = useAppSelector(getUID)

  const dispatch = useAppDispatch()

  if (!users) return <Loading />

  const mappedUsers = users.map((user: User, index: number, self: User[]) => {
    const buttonText = user.followed ? 'Unfollow' : 'Follow'
    const buttonAction = user.followed
      ? (id: number) => dispatch(unfollow(id))
      : (id: number) => dispatch(follow(id))
    const isDisabled = followQueue.some((elem: number) => elem === user.id)

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

        {user.id !== myUID && (
          <PrimaryButton
            disabled={isDisabled}
            onClick={() => {
              buttonAction(user.id)
            }}
            className='sm:text-xs lg:text-md
                    lg:py-1 lg:px-4
                    sm:py-0.5 sm:px-2'
            color='gray'
          >
            {(isDisabled && <Loading dimensions={5} />) || <>{buttonText}</>}
          </PrimaryButton>
        )}
      </div>
    )
  })

  return (
    <div
      className='lg:mx-60
        lg:border lg:rounded-lg lg:border-gray-300
        lg:bg-gray-200'
    >
      {mappedUsers}
    </div>
  )
}

export default memo(UserItems)
