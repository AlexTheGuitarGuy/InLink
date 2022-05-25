import React from 'react';
import s from './Publish.module.css';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../../common/FormControls/FormControls';

const PublishForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        className={s.textarea}
        placeholder={'Type what you think...'}
        component={Textarea}
        name={'post'}
      />
      <div>
        <button className={s.button}>Publish</button>
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
    <div className={s.all}>
      <div className={s.newPost}>New post</div>
      <ReduxPublish {...props} onSubmit={handleSubmit} />
    </div>
  );
};

export default Publish;
