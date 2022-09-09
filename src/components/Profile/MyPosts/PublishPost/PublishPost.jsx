import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Textarea } from '../../../common/FormControls/FormControls';
import { post } from '../../../../redux/profile-reducer';
import { useDispatch } from 'react-redux';

const PublishForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('Type what you think...', 'post', Textarea, null, 'text', {
        className: `resize-none py-2 px-4 rounded w-full
            border border-gray-300
            focus:outline-none focus:border-gray-500
            transition`,
        id: 'postText',
      })}

      <button
        className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700
          text-gray-100 text-center font-semibold text-sm

          lg:py-1.5
          sm:py-0.5 px-4 

          rounded w-full
          transition-colors cursor-pointer
          focus:outline-none focus:ring-0"
      >
        Publish
      </button>
    </form>
  );
};

const PublishFormRedux = reduxForm({
  form: 'login',
})(PublishForm);

const PublishPost = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(post(e.post));
    e.post = '';
  };

  return (
    <div className="">
      <label htmlFor="postText" className="lg:text-lg xl:text-2xl xl:mb-2">
        New post
      </label>
      <PublishFormRedux onSubmit={handleSubmit} />
    </div>
  );
};

export default PublishPost;
