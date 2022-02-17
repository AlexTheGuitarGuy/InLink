import { connect } from 'react-redux';
import { storeText, post } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts.jsx';

const mapStateToProps = (state) => {
  return {
    memoryText: state.profilePage.storedText,
    posts: state.profilePage.posts,
  };
};

export const MyPostsContainer = connect(mapStateToProps, {
  storeText,
  post,
})(MyPosts);
