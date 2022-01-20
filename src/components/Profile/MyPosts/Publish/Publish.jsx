import React from 'react';
import s from './Publish.module.css';

const Publish = (props) => {

    let newPost = React.createRef();

    let post = () => {
        let text = newPost.current.value;
        props.addPost(text);
    }

    let takeText = () => {
        let text = newPost.current.value;
        props.storeText(text);
    }

    return (
        <div>
            <div className={s.newPost}>New post</div>

            <textarea
                ref={newPost}
                value={props.storedText}
                onChange={(e) => takeText(e.nativeEvent.data)}
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