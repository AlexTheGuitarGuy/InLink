import { storeMessageTextActionCreator, sendMessageActionCreator } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux'
import Messages from './Messages';


let mapStateToProps = (state) => {
    return {
        memoryText: state.dialogsPage.storedText,
        state: state.dialogsPage,
        profileData: state.userData.profileData,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        storeText: (text) => {dispatch(storeMessageTextActionCreator(text))},
        send: (id) => {dispatch(sendMessageActionCreator(id))},
    }
}

export const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);