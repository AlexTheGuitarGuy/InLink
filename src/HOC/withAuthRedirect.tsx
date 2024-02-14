import { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { getIsLoggedIn } from '@/redux/auth-reducer/auth-selector'
import { useAppSelector } from '@/hooks/reduxHooks'

function withAuthRedirect<P extends Object>(Component: ComponentType<P>) {
  return (props: P) => {
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    if (!isLoggedIn) return <Navigate to='/login' />
    return <Component {...props} />
  }
}
export default withAuthRedirect
