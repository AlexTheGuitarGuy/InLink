import React from 'react';
import Post from './Post/Post.jsx'
import Publish from './Publish/Publish';

const MyPosts = (props) => {

    let postElements = props.posts.map(e => <Post text={e.text} likeCount={e.likes} />);

    return (
        <div>
            <div>
                <Publish dispatch={props.dispatch}
                    storedText={props.storedText} />
                {postElements.reverse()}
            </div>
        </div>

    );
}

export default MyPosts;