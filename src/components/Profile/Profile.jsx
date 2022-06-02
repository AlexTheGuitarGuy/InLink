import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Loading from '../common/Loading/Loading';

const Profile = ({
  isLoading,
  state: { profileData, profileStatus },
  updateStatus,
  canEdit,
}) => {
  if(isLoading || !profileData) return <Loading />

  return (
    <div>

        <ProfileInfo
          pfp={profileData.photos.large}
          profileData={profileData}
          profileStatus={profileStatus}
          updateStatus={updateStatus}
          canEdit={canEdit}
        />

      <MyPostsContainer />
    </div>
  );
};

export default Profile;
