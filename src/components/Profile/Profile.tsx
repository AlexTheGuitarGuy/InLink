import React, { useEffect } from 'react';
import Loading from '../common/Loading/Loading';
import MyPosts from './MyPosts/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentUserData,
  getIsEditing,
  getIsLoading,
  getMyData,
  getProfilePage,
} from '../../redux/profile-selector';
import { getProfile, getStatus, setEditing } from '../../redux/profile-reducer';
import { getUID } from '../../redux/auth-selector';
import { compose } from 'redux';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { useParams } from 'react-router-dom';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { InputProfileData } from '../../types/types';

const Profile = () => {
  const isEditing = useSelector(getIsEditing);
  const { profileData, myData } = useSelector(getProfilePage);

  const loggedUser = useSelector(getUID);
  const isLoading = useSelector(getIsLoading);

  const dispatch = useDispatch();

  const currentUserPage = useParams().uid;

  useEffect(() => {
    const user = (currentUserPage && +currentUserPage) || (loggedUser && +loggedUser);
    if (user) {
      dispatch(getProfile(user));
      dispatch(getStatus(user));
    }
  }, [dispatch, loggedUser, currentUserPage]);

  const isOwner = !currentUserPage;

  if (isLoading || !profileData || !myData) return <Loading />;
  if (!isOwner && isEditing) dispatch(setEditing(false));

  const pfp = profileData.photos;

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
  );
};

export default compose(withAuthRedirect)(Profile);
