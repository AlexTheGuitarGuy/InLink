import React, { memo } from 'react'

import { getUsers } from '../../../redux/users-reducer/users-selector'
import { User } from '../../../types/types'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Loading from '../../common/Loading/Loading'
import UserItem from './UserItem/UserItem'

const UserItems = () => {
  const users = useAppSelector(getUsers)

  if (!users) return <Loading />

  return (
    <div
      className='lg:mx-60
        lg:border lg:rounded-lg lg:border-gray-300
        lg:bg-gray-200'
    >
      {users.map((user: User, index: number, self: User[]) => (
        <UserItem key={user.id} user={user} index={index} self={self} />
      ))}
    </div>
  )
}

export default memo(UserItems)
