import React from 'react'

import { storeMessageTextActionCreator, sendMessageActionCreator } from '../../../redux/dialogs-reducer';
import StoreContext from '../../../redux/StoreContext';
import SendText from './SendText';

const SendTextContainer = () => {



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
}

export default SendTextContainer;