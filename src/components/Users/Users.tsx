import { useCallback, useEffect } from 'react'

import { requestUsers, usersActions } from '@/redux/users-reducer/users-reducer'
import { getPageSize, getTotalUsers, getUsers } from '@/redux/users-reducer/users-selector'

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import useScreenSize from '@/hooks/useScreenSize'

import { useLocation, useSearchParams } from 'react-router-dom'
import Loading from '@/components/common/Loading/Loading'
import Paginator from '@/components/common/Paginator/Paginator'
import UserItems from './UserItems/UserItems'
import UsersSearch from './UsersSearch/UsersSearch'

const screenSizeToPageSizeMap = {
  1366: 8,
  1600: 10,
  1920: 12,
  2560: 14,
  Infinity: 16,
}

const screenSizeToPortionSizeMap = {
  1366: 5,
  1600: 7,
  1920: 8,
  2560: 10,
  Infinity: 12,
}

const Users = () => {
  const totalUsers = useAppSelector(getTotalUsers)
  const users = useAppSelector(getUsers)

  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

  useEffect(() => {
    const screenSizeCategory = (Object.keys(screenSizeToPageSizeMap).find(
      (key) => screenSize.dynamicWidth < parseInt(key, 10),
    ) || 'Infinity') as keyof typeof screenSizeToPageSizeMap

    dispatch(usersActions.setPageSize(screenSizeToPageSizeMap[screenSizeCategory]))
  }, [dispatch, screenSize.dynamicWidth])
  const count = useAppSelector(getPageSize)

  const screenSizeCategory = (Object.keys(screenSizeToPortionSizeMap).find(
    (key) => screenSize.dynamicWidth < parseInt(key, 10),
  ) || 'Infinity') as keyof typeof screenSizeToPortionSizeMap
  const portionSize = screenSizeToPortionSizeMap[screenSizeCategory]

  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = Object.fromEntries(searchParams)

  const changePage = useCallback(
    (page: number) => {
      let newURL = `?page=${page}&count=${count}`

      if (allParams.term) newURL += `&term=${allParams.term}`
      if (allParams.friend) newURL += `&friend=${allParams.friend}`

      setSearchParams(newURL)
    },
    [count, allParams, setSearchParams],
  )

  useEffect(() => {
    if (!allParams.page) changePage(1)
  }, [changePage, allParams.page])

  useEffect(() => {
    dispatch(requestUsers(location.search))
  }, [location.search, dispatch])

  return (
    <div
      className='lg:bg-neutralBg lg:rounded-lg
                  p-8 font-semibold min-h-[88vh]'
    >
      {users === null ? (
        <Loading />
      ) : (
        <>
          <UsersSearch />
          {users.length ? (
            <div className='flex justify-between flex-col min-h-[65vh]'>
              <UserItems />
              <div className='mt-4'>
                <Paginator
                  page={+allParams.page}
                  pageSize={+allParams.count}
                  portionSize={portionSize}
                  totalElems={totalUsers}
                  changePage={changePage}
                />
              </div>
            </div>
          ) : (
            <div className='text-center'>No users match these parameters.</div>
          )}
        </>
      )}
    </div>
  )
}

export default Users
