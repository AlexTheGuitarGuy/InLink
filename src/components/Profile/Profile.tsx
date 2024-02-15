import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getUID } from '@/redux/auth-reducer/auth-selector'
import { getProfile } from '@/redux/profile-reducer/profile-reducer'
import { getIsLoading, getMyData, getProfileData } from '@/redux/profile-reducer/profile-selector'

import withAuthRedirect from '@/HOC/withAuthRedirect'
import Loading from '@/components/common/Loading/Loading'
import Posts from './Posts/Posts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = () => {
  const currentUserPageId = +(useParams<{ uid: string }>().uid || 0)

  const profileData = useAppSelector(getProfileData)
  const myData = useAppSelector(getMyData)
  const isLoading = useAppSelector(getIsLoading)
  const myUID = useAppSelector(getUID)

  const dispatch = useAppDispatch()

  const isOwner = currentUserPageId === myUID

  useEffect(() => {
    if (currentUserPageId) dispatch(getProfile(currentUserPageId))
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
