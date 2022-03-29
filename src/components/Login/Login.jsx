import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={'Login'}
          component={'input'}
          name={'login'}
        />
      </div>
      <div>
        <Field
          placeholder={'Password'}
          component={'input'}
          name={'password'}
        />
      </div>
      <div>
        <Field
          type={'checkbox'}
          component={'input'}
          name={'rememberMe'}
        />{' '}
        remember me
      </div>
      <div>
        <button> Log in </button>
      </div>
    </form>
  );
};

const ReduxLogin = reduxForm({
  form: 'login',
})(LoginForm);

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <ReduxLogin />
    </div>
  );
};

export default Login;
