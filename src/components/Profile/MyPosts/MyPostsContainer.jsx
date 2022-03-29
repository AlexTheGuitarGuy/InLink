import { connect } from 'react-redux';
import { post } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts.jsx';
import React from 'react';

class MyPostsContainer extends React.Component {
  render() {
    return <MyPosts {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    memoryText: state.profilePage.storedText,
    posts: state.profilePage.posts,
  };
};

export default connect(mapStateToProps, {
  post,
})(MyPostsContainer);
