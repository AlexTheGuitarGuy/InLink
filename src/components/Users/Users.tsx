import React, { useCallback, useEffect } from 'react'

import { getPageSize, getTotalUsers, getUsers } from '../../redux/users-reducer/users-selector'
import { requestUsers, usersActions } from '../../redux/users-reducer/users-reducer'

import useScreenSize from '../../hooks/useScreenSize'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import UserItems from './UserItems/UserItems'
import UsersSearch from './UsersSearch/UsersSearch'
import Paginator from '../common/Paginator/Paginator'
import { useLocation, useSearchParams } from 'react-router-dom'

const Users = () => {
  const totalUsers = useAppSelector(getTotalUsers)
  const users = useAppSelector(getUsers)

  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

  useEffect(() => {
    dispatch(usersActions.setPageSize(screenSize.dynamicWidth < 1366 ? 11 : 6))
  }, [dispatch, screenSize.dynamicWidth])
  const count = useAppSelector(getPageSize)

  const portionSize = screenSize.dynamicWidth < 1366 ? 5 : 10

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
    if (!allParams.page) {
      changePage(1)
    }
  }, [changePage, allParams.page])

  useEffect(() => {
    dispatch(requestUsers(location.search))
  }, [location.search, dispatch])

  return (
    <div
      className='flex justify-between flex-col
                  lg:bg-neutralBg lg:rounded-lg
                  lg:p-8 font-semibold
                  sm:h-screen lg:h-auto
    '
    >
      <UsersSearch />
      {users.length ? (
        <>
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
        </>
      ) : (
        <div className='text-center'>No users match these parameters.</div>
      )}
    </div>
  )
}

export default Users
