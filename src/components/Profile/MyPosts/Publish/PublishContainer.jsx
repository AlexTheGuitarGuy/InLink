import React from 'react';
import { storePostTextActionCreator, addPostActionCreator } from '../../../../redux/profile-reducer';
import StoreContext from '../../../../redux/StoreContext';
import Publish from './Publish';

const PublishContainer = () => {

    return (
        <StoreContext.Consumer>{
            (store) => {
                let memoryText = store.getState().profilePage.storedText;

                let post = () => {

                    store.dispatch(addPostActionCreator());
                }

                let storeText = (text) => {
                    store.dispatch(storePostTextActionCreator(text));
                }

                return (<Publish storeText={storeText}
                    post={post}
                    memoryText={memoryText} />)
            }
        }
        </StoreContext.Consumer>
    )
}

export default PublishContainer;