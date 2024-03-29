import cn from 'classnames'
import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'

import { appActions, initializeApp } from '@/redux/app-reducer/app-reducer'
import { getIsAppInitialized, getIsSidebarHidden } from '@/redux/app-reducer/app-selector'
import { getIsLoggedIn, getUID } from '@/redux/auth-reducer/auth-selector'
import { getMyProfile } from '@/redux/profile-reducer/profile-reducer'

import { compose } from 'redux'
    import AlertContainer from '@/components/Alert/AlertContainer'
import ChatFunctionality from '@/components/Chat/ChatFunctionality'
import Loading from '@/components/common/Loading/Loading'
import Header from '@/components/Header/Header'
import Login from '@/components/Login/Login'
import PageNotFound from '@/components/PageNotFound/PageNotFound'
import Profile from '@/components/Profile/Profile'
import Sidebar from '@/components/Sidebar/Sidebar'
import InboxMessages from '@/components/InboxMessages/InboxMessages'
import Users from '@/components/Users/Users'
import withThemes from '@/HOC/withThemes'

const App = () => {
  const isAppInitialized = useAppSelector(getIsAppInitialized)
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const isSidebarHidden = useAppSelector(getIsSidebarHidden)
  const uid = useAppSelector(getUID)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (uid) dispatch(getMyProfile(uid))
  }, [dispatch, uid])

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (event?.reason?.substring) {
        if (event.reason.substring(0, 18) === 'Invalid url format')
          dispatch(appActions.setAlert({ message: `Couldn't upload profile data`, type: 'error' }))
        else dispatch(appActions.setAlert({ message: event.reason, type: 'error' }))
        event.preventDefault()
      }
    }

    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  })

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch, isAppInitialized])

  if (!isAppInitialized) return <Loading />

  return (
    <div className='text-neutralFocus bg-appBg min-h-screen'>
      {isLoggedIn && (
        <div className='fixed w-60 mt-12 z-0'>
          <Sidebar />
        </div>
      )}

      <ChatFunctionality />

      <div className='fixed w-full z-20 sm:-mt-14 lg:mt-auto'>
        <Header />
      </div>

      <div
        className={cn('lg:p-4 h-full z-10', {
          'ml-60': isLoggedIn && !isSidebarHidden,
        })}
      >
        <AlertContainer />
        <div className='mt-14'>
          <Routes>
            <Route index element={<Navigate to='/profile' />} />
            <Route path='/profile/:uid' element={<Profile />} />
            <Route path='/profile' element={<Navigate to={`/profile/${uid}`} />} />
            <Route path='/messages/*' element={<InboxMessages />} />

            <Route path='/login' element={<Login />} />
            <Route path='/login/facebook' element={<div>facebook</div>} />
            <Route path='/users' element={<Users />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default compose(withThemes)(App)
