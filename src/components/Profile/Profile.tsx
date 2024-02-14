import { useEffect,  } from 'react'
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
import { getIsLoading, getProfilePage } from '../../redux/profile-reducer/profile-selector'

import withAuthRedirect from '../../HOC/withAuthRedirect'
import Loading from '../common/Loading/Loading'
import Posts from './Posts/Posts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = () => {
  const currentUserPageId = +(useParams<{ uid: string }>().uid || 0)

  const { profileData, myData } = useAppSelector(getProfilePage)
  const isLoading = useAppSelector(getIsLoading)
  const myUID = useAppSelector(getUID)

  const dispatch = useAppDispatch()

  const isOwner = currentUserPageId === myUID

  useEffect(() => {
    if (currentUserPageId) {
      dispatch(profileActions.setUserId(currentUserPageId))
      dispatch(getProfile(currentUserPageId))
      dispatch(getStatus(currentUserPageId))
      dispatch(getIsCurrentUserFollowed(currentUserPageId))
    }
  }, [dispatch, currentUserPageId])

  if (!profileData || !myData || isLoading) return <Loading />

  const pfp = profileData.photos

  return (
    <div>
      <ProfileInfo isOwner={isOwner} pfp={pfp.large} profileData={isOwner ? myData : profileData} />
      <Posts isOwner={isOwner} pfp={pfp.small} userName={profileData.fullName} />
    </div>
  )
}

export default compose(withAuthRedirect)(Profile)
