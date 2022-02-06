import { connect } from 'react-redux'
import { storePostTextActionCreator, addPostActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts.jsx';

let mapDispatchToProps = (dispatch) => {

    return {
        storeText: (text) => { dispatch(storePostTextActionCreator(text)) },
        post: () => { dispatch(addPostActionCreator()) },
    }
}

let mapStateToProps = (state) => {
    return {
        memoryText: state.profilePage.storedText,
        posts: state.profilePage.posts,
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
