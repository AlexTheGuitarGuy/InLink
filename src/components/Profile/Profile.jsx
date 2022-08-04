import React, { useEffect } from 'react';
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
import {
  getProfile,
  getStatus,
  setEditing,
} from '../../redux/profile-reducer';
import { getUID } from '../../redux/auth-selector';
import { compose } from 'redux';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import withRouter from '../../HOC/withRouter';

const Profile = ({ router }) => {
  const isEditing = useSelector(getIsEditing);
  const { profileData, profileStatus } = useSelector(getProfilePage);
  const isLoading = useSelector(getIsLoading);
  const loggedUser = useSelector(getUID);

  const dispatch = useDispatch();

  const currentUserPage = router.params.uid;
  useEffect(() => {
    const user = currentUserPage || loggedUser;

    dispatch(getProfile(user));
    dispatch(getStatus(user));
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

export default compose(withAuthRedirect, withRouter)(Profile);
