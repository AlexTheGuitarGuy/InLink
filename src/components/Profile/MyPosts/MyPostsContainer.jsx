import {connect} from 'react-redux';
import {
  storePostTextActionCreator,
  addPostActionCreator,
} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts.jsx';

const mapDispatchToProps = (dispatch) => {
  return {
    storeText: (text) => {
      dispatch(storePostTextActionCreator(text));
    },
    post: () => {
      dispatch(addPostActionCreator());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    memoryText: state.profilePage.storedText,
    posts: state.profilePage.posts,
  };
};

export const MyPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPosts);
