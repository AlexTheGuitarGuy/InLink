import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Profile';
import { getProfile, getStatus } from '../../redux/profile-reducer';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { getUID } from '../../redux/auth-selector';
import withRouter from '../../HOC/withRouter';

const ProfileContainer = ({ router }) => {
  const currentUserPage = router.params.uid;
  const loggedUser = useSelector(getUID);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = currentUserPage || loggedUser;

    dispatch(getProfile(user));
    dispatch(getStatus(user));
  }, [dispatch, loggedUser, currentUserPage]);

  return <Profile isOwner={!currentUserPage} />;
};

export default compose(
  withAuthRedirect,
  withRouter,
)(ProfileContainer);
