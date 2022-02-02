import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

    return (
        <div className={s.content}>
            <div className={s.formatting}>
                <ProfileInfo pfp={props.profileData.pfp} />

                <MyPosts posts={props.state.posts}
                    />
            </div>
        </div>

    );
}

export default Profile;