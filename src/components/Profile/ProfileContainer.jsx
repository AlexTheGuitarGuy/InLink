import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getProfile,
  getStatus,
  setCanEdit,
  updateStatus,
} from '../../redux/profile-reducer';
import { useLocation, useParams } from 'react-router-dom';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import {
  getCanEdit,
  getIsLoading,
  getProfilePage,
} from '../../redux/profile-selector';
import { getIsLoggedIn, getUID } from '../../redux/auth-selector';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let params = useParams();
    return <Component {...props} router={{ location, params }} />;
  }

  return ComponentWithRouterProp;
}

const ProfileContainer = (props) => {
  let loggedUser = props.uid;
  let currentUserPage = props.router.params.uid;

  useEffect(() => {
    let user = currentUserPage || loggedUser;

    if (user === loggedUser) props.setCanEdit(true);
    else props.setCanEdit(false);

    props.getProfile(user);
    props.getStatus(user);
  }, [loggedUser, currentUserPage]);

  return <Profile {...props} />;
};

const mapStateToProps = (state) => {
  return {
    state: getProfilePage(state),
    isLoading: getIsLoading(state),
    isLoggedIn: getIsLoggedIn(state),
    uid: getUID(state),
    canEdit: getCanEdit(state),
  };
};

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    setCanEdit,
  }),
)(ProfileContainer);
