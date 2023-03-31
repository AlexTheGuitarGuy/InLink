import { ComponentType } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getIsLoggedIn } from '../redux/auth-reducer/auth-selector'

function withAuthRedirect<P extends Object>(Component: ComponentType<P>) {
  return (props: P) => {
    const isLoggedIn = useSelector(getIsLoggedIn)
    if (!isLoggedIn) return <Navigate to='/login' />
    return <Component {...props} />
  }
}
export default withAuthRedirect
