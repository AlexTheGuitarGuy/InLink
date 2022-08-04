import React from 'react';
import Loading from '../common/Loading/Loading';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfoText from './ProfileInfo/ProfileInfoText/ProfileInfoText';
import ProfileInfoInput from './ProfileInfo/ProfileInfoInput/ProfileInfoInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsEditing,
  getIsLoading,
  getProfilePage,
} from '../../redux/profile-selector';
import { setEditing } from '../../redux/profile-reducer';

const Profile = ({ isOwner }) => {
  const isEditing = useSelector(getIsEditing);
  const { profileData, profileStatus } = useSelector(getProfilePage);
  const isLoading = useSelector(getIsLoading);

  const dispatch = useDispatch();

  if (isLoading || !profileData) return <Loading />;
  if (!isOwner && isEditing) dispatch(setEditing(false));

  const pfp = profileData.photos;

  return (
    <div>
      {isEditing && isOwner ? (
        <ProfileInfoInput
          isOwner={isOwner}
          pfp={pfp.large}
          profileData={profileData}
          profileStatus={profileStatus}
        />
      ) : (
        <ProfileInfoText
          isOwner={isOwner}
          pfp={pfp.large}
          profileData={profileData}
          profileStatus={profileStatus}
        />
      )}
      <MyPosts
        isOwner={isOwner}
        pfp={pfp.small}
        userName={profileData.fullName}
      />
    </div>
  );
};

export default Profile;
