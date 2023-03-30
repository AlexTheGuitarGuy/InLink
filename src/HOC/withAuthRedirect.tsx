import React, { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../redux/auth-reducer/auth-selector'

function withAuthRedirect<P extends Object>(Component: ComponentType<P>) {
  return (props: P) => {
    const isLoggedIn = useSelector(getIsLoggedIn)
    if (!isLoggedIn) return <Navigate to='/login' />
    return <Component {...props} />
  }
}
export default withAuthRedirect
