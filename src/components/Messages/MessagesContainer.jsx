import { useDispatch, useSelector } from 'react-redux';
import Messages from './Messages';
import React, { useEffect } from 'react';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import Loading from '../common/Loading/Loading';
import { getUID } from '../../redux/auth-selector';
import { getMyData } from '../../redux/profile-selector';
import { getProfile } from '../../redux/profile-reducer';

const MessagesContainer = () => {
  const uid = useSelector(getUID);
  const myData = useSelector(getMyData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(uid));
  });

  if (!myData) return <Loading />;

  return <Messages myData={myData} />;
};

export default compose(withAuthRedirect)(MessagesContainer);
