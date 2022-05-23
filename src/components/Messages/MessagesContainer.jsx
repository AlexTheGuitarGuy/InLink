import { send } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import Messages from './Messages';
import React from 'react';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import {
  getDialogsPage,
  getStoredText,
} from '../../redux/dialogs-selector';
import { getProfileData } from '../../redux/user-selector';

const MessagesContainer = (props) => {
  return <Messages {...props} />;
};

let mapStateToProps = (state) => {
  return {
    memoryText: getStoredText(state),
    state: getDialogsPage(state),
    profileData: getProfileData(state),
  };
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    send,
  }),
)(MessagesContainer);
