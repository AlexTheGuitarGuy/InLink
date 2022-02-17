import { storeText, send } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import Messages from './Messages';

let mapStateToProps = (state) => {
  return {
    memoryText: state.dialogsPage.storedText,
    state: state.dialogsPage,
    profileData: state.userData.profileData,
  };
};

export const MessagesContainer = connect(mapStateToProps, {
  storeText,
  send,
})(Messages);
