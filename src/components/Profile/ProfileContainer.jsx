import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getProfile,
  getStatus,
  post,
  updateStatus,
  uploadPFP,
  uploadProfileInfo,
} from '../../redux/profile-reducer';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import {
  getIsLoading,
  getPosts,
  getProfilePage,
  getStoredText,
} from '../../redux/profile-selector';
import { getUID } from '../../redux/auth-selector';
import withRouter from '../../HOC/withRouter';

const ProfileContainer = ({
  uid,
  router,
  getProfile,
  getStatus,
  ...props
}) => {
  let loggedUser = uid;
  let currentUserPage = router.params.uid;

  useEffect(() => {
    let user = currentUserPage || loggedUser;

    getProfile(user);
    getStatus(user);
  }, [getProfile, getStatus, loggedUser, currentUserPage]);

  return <Profile isOwner={!currentUserPage} {...props} />;
};

const mapStateToProps = (state) => {
  return {
    state: getProfilePage(state),
    isLoading: getIsLoading(state),
    uid: getUID(state),
    memoryText: getStoredText(state),
    posts: getPosts(state),
  };
};

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    uploadPFP,
    post,
    uploadProfileInfo,
  }),
)(ProfileContainer);
