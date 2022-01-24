import React from 'react';
import s from './Publish.module.css';
import { storePostTextActionCreator, addPostActionCreator } from '../../../../redux/state';

const Publish = (props) => {

    let newPost = React.createRef();

    let post = () => {
        props.dispatch(addPostActionCreator());
    }

    let takeText = () => { 
        let text = newPost.current.value;
        props.dispatch(storePostTextActionCreator(text));
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