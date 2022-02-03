import React from 'react';
import Post from './Post/Post.jsx'
import {PublishContainer} from './Publish/PublishContainer';

const MyPosts = (props) => {

    let postElements = props.posts.map(e => <Post text={e.text} likeCount={e.likes} />);

    return (
        <div>
            <div>
                <PublishContainer />
                {postElements.reverse()}
            </div>
        </div>

    );
}

export default MyPosts;