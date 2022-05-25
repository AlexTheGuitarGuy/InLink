import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Loading from '../common/Loading/Loading';

const Profile = ({
  isLoading,
  state: { profileData, profileStatus },
  updateStatus,
  canEdit,
}) => {
  return (
    <div>
      {(!isLoading && profileData && (
        <ProfileInfo
          pfp={profileData.photos.large}
          profileData={profileData}
          profileStatus={profileStatus}
          updateStatus={updateStatus}
          canEdit={canEdit}
        />
      )) || <Loading class={s.loadImg} />}
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
