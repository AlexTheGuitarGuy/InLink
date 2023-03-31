import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getUID } from '../../redux/auth-reducer/auth-selector'
import {
  getIsCurrentUserFollowed,
  getProfile,
  getStatus,
  profileActions,
} from '../../redux/profile-reducer/profile-reducer'
import { getProfilePage } from '../../redux/profile-reducer/profile-selector'

import withAuthRedirect from '../../HOC/withAuthRedirect'
import Loading from '../common/Loading/Loading'
import Posts from './Posts/Posts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = () => {
  const { profileData, myData } = useAppSelector(getProfilePage)
  const myUID = useAppSelector(getUID)
  const loggedUser = useAppSelector(getUID)

  const dispatch = useAppDispatch()

  const currentUserPage = useParams().uid

  useEffect(() => {
    const userId = (currentUserPage && +currentUserPage) || (loggedUser && +loggedUser)
    if (userId) {
      dispatch(profileActions.setUserId(userId))
      dispatch(getProfile(userId))
      dispatch(getStatus(userId))
      dispatch(getIsCurrentUserFollowed(userId))
    }
  }, [dispatch, loggedUser, currentUserPage])

  const isOwner = !!(currentUserPage && +currentUserPage === myUID)

  if (!profileData || !myData) return <Loading />

  const pfp = profileData.photos

  return (
    <div>
      <ProfileInfo isOwner={isOwner} pfp={pfp.large} profileData={isOwner ? myData : profileData} />
      <Posts isOwner={isOwner} pfp={pfp.small} userName={profileData.fullName} />
    </div>
  )
}

export default compose(withAuthRedirect)(Profile)
