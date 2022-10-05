import React, { useEffect } from 'react'

import { getIsLoading, getPage, getTotalUsers } from '../../redux/users-reducer/users-selector'
import { requestUsers, usersActions } from '../../redux/users-reducer/users-reducer'

import useScreenSize from '../../hooks/useScreenSize'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import Loading from '../common/Loading/Loading'
import UserItems from './UserItems/UserItems'
import UsersSearch from './UsersSearch/UsersSearch'
import Paginator from '../common/Paginator/Paginator'

const Users = () => {
  const totalUsers = useAppSelector(getTotalUsers)
  const isLoading = useAppSelector(getIsLoading)
  const page = useAppSelector(getPage)

  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

  const pageSize = screenSize.dynamicWidth < 1366 ? 11 : 6
  const portionSize = screenSize.dynamicWidth < 1366 ? 5 : 10

  const changePage = (page: number) => {
    dispatch(requestUsers(page, pageSize))
    dispatch(usersActions.setPage(page))
  }

  useEffect(() => {
    dispatch(requestUsers(page, pageSize))
  }, [dispatch, page, pageSize])

  if (isLoading) return <Loading />

  return (
    <div
      className='flex justify-between flex-col
                  lg:bg-gray-100 lg:rounded-lg lg:p-8
                  text-gray-700 font-semibold
                  sm:h-screen lg:h-auto
    '
    >
      <UsersSearch />
      <UserItems />
      <div className='mt-4'>
        <Paginator
          pageSize={pageSize}
          portionSize={portionSize}
          totalElems={totalUsers}
          changePage={changePage}
          page={page}
        />
      </div>
    </div>
  )
}

export default Users
