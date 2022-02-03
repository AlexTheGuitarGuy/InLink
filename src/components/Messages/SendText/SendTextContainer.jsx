
import { storeMessageTextActionCreator, sendMessageActionCreator } from '../../../redux/dialogs-reducer';
import SendText from './SendText';
import { connect } from 'react-redux'


/*const SendTextContainer = () => {



    return (
        <StoreContext.Consumer>
            {(store) => {
                let memoryText = store.getState().dialogsPage.storedText;
                let send = () => {
                    store.dispatch(sendMessageActionCreator());
                }

                let storeText = (text) => {
                    store.dispatch(storeMessageTextActionCreator(text));
                }
                return (<SendText send={send}
                    storeText={storeText}
                    memoryText={memoryText} />)
            }}
        </StoreContext.Consumer>
    );
}*/

let mapStateToProps = (state) => {
    return {
        memoryText: state.dialogsPage.storedText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        storeText: (text) => {dispatch(storeMessageTextActionCreator(text))},
        send: () => {dispatch(sendMessageActionCreator())},
    }
}

export const SendTextContainer = connect(mapStateToProps, mapDispatchToProps)(SendText);

//export default SendTextContainer;