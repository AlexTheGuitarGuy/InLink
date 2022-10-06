import React, { useEffect } from 'react'

import { getIsLoading, getTotalUsers } from '../../redux/users-reducer/users-selector'
import { requestUsers, UsersRequest } from '../../redux/users-reducer/users-reducer'

import useScreenSize from '../../hooks/useScreenSize'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import Loading from '../common/Loading/Loading'
import UserItems from './UserItems/UserItems'
import UsersSearch from './UsersSearch/UsersSearch'
import Paginator from '../common/Paginator/Paginator'
import { useSearchParams } from 'react-router-dom'

const Users = () => {
  const totalUsers = useAppSelector(getTotalUsers)
  const isLoading = useAppSelector(getIsLoading)

  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

  const count = screenSize.dynamicWidth < 1366 ? 11 : 6
  const portionSize = screenSize.dynamicWidth < 1366 ? 5 : 10

  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = Object.fromEntries(searchParams)

  const changePage = (page: number) => {
    dispatch(requestUsers({ page, count }))
    setSearchParams(`?page=${page}&count=${count}`)
  }

  useEffect(() => {
    if (!allParams.page) {
      dispatch(requestUsers({ page: 1, count }))
      setSearchParams(`?page=1&count=${count}`)
    }
  }, [allParams.page, dispatch, count, setSearchParams])

  if (isLoading) return <Loading />

  return (
    <div
      className='flex justify-between flex-col
                  lg:bg-gray-100 lg:rounded-lg 
                  lg:p-8
                  text-gray-700 font-semibold
                  sm:h-screen lg:h-auto
    '
    >
      <UsersSearch />
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
  )
}

export default Users
