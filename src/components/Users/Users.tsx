import React, { useEffect } from 'react'

import { getIsLoading, getTotalUsers } from '../../redux/users-reducer/users-selector'
import { requestUsers } from '../../redux/users-reducer/users-reducer'

import useScreenSize from '../../hooks/useScreenSize'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import Loading from '../common/Loading/Loading'
import UserItems from './UserItems/UserItems'
import UsersSearch from './UsersSearch/UsersSearch'
import Paginator from '../common/Paginator/Paginator'
import { useLocation, useSearchParams } from 'react-router-dom'

const Users = () => {
  const totalUsers = useAppSelector(getTotalUsers)
  const isLoading = useAppSelector(getIsLoading)

  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

  const count = screenSize.dynamicWidth < 1366 ? 11 : 6
  const portionSize = screenSize.dynamicWidth < 1366 ? 5 : 10

  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = Object.fromEntries(searchParams)

  const changePage = (page: number) => {
    let newURL = `?page=${page}&count=${count}`

    if (allParams.term) newURL += `&term=${allParams.term}`
    if (allParams.friend) newURL += `&friend=${allParams.friend}`

    setSearchParams(newURL)
  }

  useEffect(() => {
    if (!allParams.page) {
      setSearchParams(`?page=1&count=${count}`)
    }
  }, [allParams.page, dispatch, count, setSearchParams])

  useEffect(() => {
    dispatch(requestUsers(location.search))
  }, [location.search, dispatch])

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
