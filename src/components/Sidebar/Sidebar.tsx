import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { appActions } from '../../redux/app-reducer/app-reducer'
import { getIsSidebarHidden } from '../../redux/app-reducer/app-selector'

import useScreenSize from '../../hooks/useScreenSize'

import FriendItems from './FriendItems/FriendItems'

const Sidebar = () => {
  const dispatch = useDispatch()
  const screenSize = useScreenSize()
  const location = useLocation()

  const isSidebarHidden = useSelector(getIsSidebarHidden)

  useEffect(() => {
    if (location.pathname.match('/messages') || screenSize.dynamicWidth < 1366) {
      dispatch(appActions.setIsSidebarHidden(true))
    } else dispatch(appActions.setIsSidebarHidden(false))
  }, [dispatch, location.pathname, screenSize.dynamicWidth])

  if (isSidebarHidden) return null

  return (
    <div className='p-6'>
      <FriendItems />
    </div>
  )
}

export default Sidebar
