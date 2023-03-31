import React from 'react'

import { getIsLoading, getUsers } from '../../../redux/users-reducer/users-selector'
import { User } from '../../../types/types'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Loading from '../../common/Loading/Loading'
import UserItem from './UserItem/UserItem'

const UserItems = () => {
  const isLoading = useAppSelector(getIsLoading)
  const users = useAppSelector(getUsers)

  if (isLoading || !users.length) return <Loading />

  return (
    <div
      className='lg:mx-60
        lg:border lg:rounded-lg lg:border-onNeutralBg
        lg:bg-neutralChild'
    >
      {users.map((user: User, index: number, self: User[]) => (
        <UserItem key={user.id} user={user} index={index} self={self} />
      ))}
    </div>
  )
}

export default UserItems
