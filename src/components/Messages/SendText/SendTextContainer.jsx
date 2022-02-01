import React from 'react'

import {storeMessageTextActionCreator, sendMessageActionCreator} from '../../../redux/dialogs-reducer';
import SendText from './SendText';

const SendTextContainer = (props) => {

    let storedText = props.store.getState().dialogsPage.storedText;
    let send = () => {
        props.store.dispatch(sendMessageActionCreator());
    }

    let storeText = (text) => {
        props.store.dispatch(storeMessageTextActionCreator(text));
    }

    return (
        <SendText send = {send} 
        storeText = {storeText}
        storedText = {storedText}/>
    );
}

export default SendTextContainer;