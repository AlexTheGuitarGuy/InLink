import React from 'react'
import s from './SendText.module.css'
import {storeMessageTextActionCreator, sendMessageActionCreator} from '../../../redux/dialogs-reducer';

const SendText = (props) => {
    
    let newPost = React.createRef();

    let post = () => {
        props.send();
    }

    let takeText = () => {
        let text = newPost.current.value;
        props.storeText(text);
    }

    return (
        <div>
            <textarea className={s.textArea}
                ref={newPost}
                value={props.storedText}
                onChange={() => takeText()}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') post();
                }}
                placeholder='Enter your message'></textarea>

            <div className={s.button}>
                <button onClick={post}>Send</button>
            </div>
        </div>
    );
}

export default SendText;