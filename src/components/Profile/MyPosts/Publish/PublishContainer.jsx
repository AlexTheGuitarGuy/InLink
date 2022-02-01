import React from 'react';
import { storePostTextActionCreator, addPostActionCreator } from '../../../../redux/profile-reducer';
import Publish from './Publish';

const PublishContainer = (props) => {

    let storedText = props.store.getState().profilePage.storedText;

    let post = () => {
        
        props.store.dispatch(addPostActionCreator());
    }

    let storeText = (text) => {
        props.store.dispatch(storePostTextActionCreator(text));
    }

    return (
        <Publish storeText={storeText}
            post={post} 
            storedText = {storedText}/>
    );
}

export default PublishContainer;