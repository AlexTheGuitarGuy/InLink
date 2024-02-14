import { useAppSelector } from '@/hooks/reduxHooks'
import { getIsLoading, getUsers } from '@/redux/users-reducer/users-selector'
import { User } from '@/types'
import Loading from '@/components/common/Loading/Loading'
import UserItem from './UserItem/UserItem'

const UserItems = () => {
  const isLoading = useAppSelector(getIsLoading)
  const users = useAppSelector(getUsers)

  if (isLoading || users === null) return <Loading />

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
