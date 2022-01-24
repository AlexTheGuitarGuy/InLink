import React from 'react';
import s from './Publish.module.css';

const Publish = (props) => {

    let newPost = React.createRef();

    let post = () => {
        props.dispatch({type: "ADD-POST"});
    }

    let takeText = () => { 
        let text = newPost.current.value;
        props.dispatch({type: "STORE-TEXT", text: text});
    }

    return (
        <div>
            <div className={s.newPost}>New post</div>

            <textarea
                ref={newPost}
                value={props.storedText}
                onChange={() => takeText()}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') post();
                }}
            />

            <div className={s.button}>
                <button
                    onClick={post}>
                    Publish
                </button>
            </div>
        </div>
    );
}

export default Publish;