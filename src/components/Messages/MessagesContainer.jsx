import { sendMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import Messages from './Messages';
import React, { useEffect } from 'react';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import {
  getDialogsPage,
  getStoredText,
} from '../../redux/dialogs-selector';
import { getUID } from '../../redux/auth-selector';
import { getProfile } from '../../redux/profile-reducer';
import Loading from '../common/Loading/Loading';
import { getProfileData } from '../../redux/profile-selector';

const MessagesContainer = ({ uid, getProfile, ...props }) => {
  useEffect(() => {
    getProfile(uid);
  });

  if (!props.myData) return <Loading />;

  return <Messages {...props} />;
};

let mapStateToProps = (state) => {
  return {
    memoryText: getStoredText(state),
    state: getDialogsPage(state),
    uid: getUID(state),
    myData: getProfileData(state),
  };
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    send: sendMessage,
    getProfile,
  }),
)(MessagesContainer);
