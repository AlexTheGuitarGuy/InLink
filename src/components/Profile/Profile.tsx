import React, { useEffect } from 'react'
import { compose } from 'redux'
import { useParams } from 'react-router-dom'

import {
  getIsEditing,
  getIsLoading,
  getProfilePage,
} from '../../redux/profile-reducer/profile-selector'
import { getUID } from '../../redux/auth-reducer/auth-selector'
import { getProfile, getStatus, profileActions } from '../../redux/profile-reducer/profile-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import withAuthRedirect from '../../HOC/withAuthRedirect'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Loading from '../common/Loading/Loading'
import MyPosts from './MyPosts/MyPosts'

const Profile = () => {
  const isEditing = useAppSelector(getIsEditing)
  const { profileData, myData } = useAppSelector(getProfilePage)

  const loggedUser = useAppSelector(getUID)
  const isLoading = useAppSelector(getIsLoading)

  const dispatch = useAppDispatch()

  const currentUserPage = useParams().uid

  useEffect(() => {
    const user = (currentUserPage && +currentUserPage) || (loggedUser && +loggedUser)
    if (user) {
      dispatch(getProfile(user))
      dispatch(getStatus(user))
    }
  }, [dispatch, loggedUser, currentUserPage])

  const isOwner = !currentUserPage

  if (isLoading || !profileData || !myData) return <Loading />
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
      <MyPosts isOwner={isOwner} pfp={pfp.small} userName={profileData.fullName} />
    </div>
  )
}

export default compose(withAuthRedirect)(Profile)
