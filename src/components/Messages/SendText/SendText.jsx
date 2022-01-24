import React from 'react'
import s from './SendText.module.css'

const SendText = (props) => {
    
    let newPost = React.createRef();

    let post = () => {
        let text = newPost.current.value;
        props.sendMessage(text);
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
                onChange={(e) => takeText(e.nativeEvent.data)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') post();
                }}></textarea>

            <div className={s.button}>
                <button onClick={post}>Send</button>
            </div>
        </div>
    );
}

export default SendText;