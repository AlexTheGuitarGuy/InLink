import React from 'react';
import s from './Publish.module.css';

const Publish = (props) => {

    let newPost = React.createRef();

    let post = () => {
        props.post();
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
                value={props.memoryText}
                onChange={() => takeText()}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') post();
                }}
                placeholder='Type what you think'/>

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