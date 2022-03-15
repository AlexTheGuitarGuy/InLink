import { storeText, send } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import Messages from './Messages';
import React from 'react';
import { Navigate } from 'react-router-dom';

class MessagesContainer extends React.Component {
  render() {
    if (!this.props.isLoggedin) return <Navigate to="/login" />;
    return <Messages {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    memoryText: state.dialogsPage.storedText,
    state: state.dialogsPage,
    profileData: state.userData.profileData,
    isLoggedin: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, {
  storeText,
  send,
})(MessagesContainer);
