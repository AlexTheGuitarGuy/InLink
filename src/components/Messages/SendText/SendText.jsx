import React from 'react'
import s from './SendText.module.css'

const SendText = (props) => {
    
    let newPost = React.createRef();

    let post = () => {
        props.dispatch({type: "SEND-MESSAGE"});
    }

    let takeText = () => {
        let text = newPost.current.value;
        props.dispatch({type: "STORE-TEXT", text: text});
    }

    return (
        <div>
            <textarea className={s.textArea}
                ref={newPost}
                value={props.storedText}
                onChange={() => takeText()}
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