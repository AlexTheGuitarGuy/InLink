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
        { className: 'resize-none py-2 px-4 rounded w-full' },
      )}

      <div
        className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700
          text-gray-100 text-center
          py-1.5 px-4 rounded
          transition-colors cursor-pointer"
      >
        <button className="font-semibold">Publish</button>
      </div>
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
      <div className="text-center mb-2">New post</div>
      <ReduxPublish {...props} onSubmit={handleSubmit} />
    </div>
  );
};

export default Publish;
