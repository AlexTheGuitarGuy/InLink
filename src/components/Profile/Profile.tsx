import React, { useEffect } from 'react';
import Loading from '../common/Loading/Loading';
import MyPosts from './MyPosts/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getIsEditing, getIsLoading, getProfilePage } from '../../redux/profile-selector';
import { getProfile, getStatus, setEditing } from '../../redux/profile-reducer';
import { getUID } from '../../redux/auth-selector';
import { compose } from 'redux';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { useParams } from 'react-router-dom';
import ProfileInfoInput from './ProfileInfo/ProfileInfoInput/ProfileInfoInput';
import CommonProfile from './ProfileInfo/CommonProfile/CommonProfile';
import { ProfileData } from '../../types/types';

export type ProfileInfoProps = {
  isOwner: boolean;
  isEditing: boolean;
  pfp: string;
  profileData: ProfileData;
  profileStatus: string | null;
  maxLen?: (message: string) => string | undefined;
};

const Profile = () => {
  const isEditing = useSelector(getIsEditing);
  const { profileData, profileStatus } = useSelector(getProfilePage);

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

  if (isLoading || !profileData) return <Loading />;
  if (!isOwner && isEditing) dispatch(setEditing(false));

  const pfp = profileData.photos;

  return (
    <div>
      {isEditing && isOwner ? (
        <ProfileInfoInput
          isOwner={isOwner}
          isEditing={isEditing}
          pfp={pfp.large}
          profileData={profileData}
          profileStatus={profileStatus}
        />
      ) : (
        <CommonProfile
          isOwner={isOwner}
          isEditing={isEditing}
          pfp={pfp.large}
          profileData={profileData}
          profileStatus={profileStatus}
        />
      )}
      <MyPosts isOwner={isOwner} pfp={pfp.small} userName={profileData.fullName} />
    </div>
  );
};

export default compose(withAuthRedirect)(Profile);
