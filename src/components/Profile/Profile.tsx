import React, { useEffect } from 'react'
import { compose } from 'redux'
import { useParams } from 'react-router-dom'

import { getIsEditing, getProfilePage } from '../../redux/profile-reducer/profile-selector'
import { getUID } from '../../redux/auth-reducer/auth-selector'
import {
  getProfile,
  getStatus,
  getIsCurrentUserFollowed,
  profileActions,
} from '../../redux/profile-reducer/profile-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import withAuthRedirect from '../../HOC/withAuthRedirect'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Loading from '../common/Loading/Loading'
import Posts from './Posts/Posts'

const Profile = () => {
  const isEditing = useAppSelector(getIsEditing)
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
  if (!isOwner && isEditing) dispatch(profileActions.setEditing(false))

  const pfp = profileData.photos

  return (
    <div>
      <ProfileInfo
        isOwner={isOwner}
        isEditing={isEditing}
        pfp={pfp.large}
        profileData={isOwner ? myData : profileData}
      />
      <Posts isOwner={isOwner} pfp={pfp.small} userName={profileData.fullName} />
    </div>
  )
}

export default compose(withAuthRedirect)(Profile)
