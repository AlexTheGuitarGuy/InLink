import { connect } from 'react-redux';
import { post } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts.jsx';
import React, { memo } from 'react';
import { getPosts, getStoredText } from '../../../redux/profile-selector';
import { compose } from 'redux';

const MyPostsContainer = (props) => {
  return <MyPosts {...props} />;
};

const mapStateToProps = (state) => {
  return {
    memoryText: getStoredText(state),
    posts: getPosts(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    post,
  }),
  memo,
)(MyPostsContainer);
