import React from 'react';
import s from './Post.module.css';
import pfp from './pfp.jpg';

const Post = (post) => {
    return (
        <div>

            <div>
                <div className={s.item}>
                    <img src={pfp} alt='poster_pfp' />

                    <div className={s.text}>
                        {post.text}
                    </div>

                    <div className={s.likeCount}>
                        ❤{post.likeCount}
                    </div>
                    
                </div>
            </div>

        </div>

    );
}

export default Post;