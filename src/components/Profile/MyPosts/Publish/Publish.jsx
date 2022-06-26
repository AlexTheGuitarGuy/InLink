import React from 'react';
import { reduxForm } from 'redux-form';
import {
  createField,
  Textarea,
} from '../../../common/FormControls/FormControls';

const PublishForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField(
        'Type what you think...',
        'post',
        Textarea,
        null,
        'text',
        {
          className: 'resize-none py-2 px-4 rounded w-full',
          id: 'postText',
        },
      )}

      <button
        className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700
          text-gray-100 text-center font-semibold
          py-1.5 px-4 rounded
          transition-colors cursor-pointer"
      >
        Publish
      </button>
    </form>
  );
};

const ReduxPublish = reduxForm({
  form: 'login',
})(PublishForm);

const Publish = ({ post, ...props }) => {
  const handleSubmit = (e) => {
    post(e.post);
    e.post = '';
  };

  return (
    <div>
      <label htmlFor="postText" className="text-lg">
        New post
      </label>
      <ReduxPublish {...props} onSubmit={handleSubmit} />
    </div>
  );
};

export default Publish;
