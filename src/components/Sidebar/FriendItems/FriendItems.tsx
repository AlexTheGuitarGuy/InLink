import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Placeholder from '../../../assets/pfps/placeholder.jpg'
import { getFrontPageFriends } from '../../../redux/users-reducer/users-selector'

const FriendItems = () => {
  const friends = useSelector(getFrontPageFriends)

  let friendList = friends.map(({ name, photos }, index: number) => {
    if (index < 5) {
      return (
        <NavLink to={`/messages/${index}`} key={name}>
          <div
            className='p-2 flex items-center mt-4
                        transition-colors
                        border-b-2 border-transparent
                        hover:bg-neutralChild active:bg-onNeutralBg
                        hover:border-onNeutralBg active:border-neutralFocus
          '
          >
            <img
              src={photos.small || Placeholder}
              alt={name}
              className='h-12 w-12
              xl:h-16 xl:w-16
              rounded-full'
            />
            <div className='ml-2 text-sm font-semibold xl:ml-4'>{name}</div>
          </div>
        </NavLink>
      )
    }
    return null
  })

  return (
    <div className='bg-neutralBg p-2 -mr-4 rounded-lg font-semibold'>
      <div className='text-lg ml-2 xl:text-xl'>Contacts:</div>
      <div>
        {friendList}
        <NavLink to='/users?friend=true' className='font-normal ml-4 text-sm hover:underline'>
          See all..
        </NavLink>
      </div>
    </div>
  )
}

export default FriendItems
