import { send } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import Messages from './Messages';
import React from 'react';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

class MessagesContainer extends React.Component {
  render() {
    return <Messages {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    memoryText: state.dialogsPage.storedText,
    state: state.dialogsPage,
    profileData: state.userData.profileData,
  };
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    send,
  }),
)(MessagesContainer);
