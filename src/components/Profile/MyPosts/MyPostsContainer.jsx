import { connect } from 'react-redux';
import { post } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts.jsx';
import React from 'react';
import {
  getPosts,
  getStoredText,
} from '../../../redux/profile-selector';

class MyPostsContainer extends React.Component {
  render() {
    return <MyPosts {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    memoryText: getStoredText(state),
    posts: getPosts(state),
  };
};

export default connect(mapStateToProps, {
  post,
})(MyPostsContainer);
