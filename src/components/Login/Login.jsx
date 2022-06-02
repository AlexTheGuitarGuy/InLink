import React from 'react';
import { reduxForm } from 'redux-form';
import { maxLen, required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormControls/FormControls';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import s from './Login.module.css';
import e from '../common/FormControls/FormControls.module.css';
import { Navigate } from 'react-router-dom';
import { compose } from 'redux';

const LoginForm = ({ handleSubmit, error, maxLen, captcha }) => {
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      {error && <div className={e.summaryError}>{error}</div>}

      <div className={s.email}>
        {createField(
          'Email',
          'email',
          Input,
          [required, maxLen],
          null,
        )}
      </div>
      <div className={s.password}>
        {createField(
          'Password',
          'password',
          Input,
          [required, maxLen],
          'password',
        )}
      </div>
      <div className={s.rememberMe}>
        {createField(
          'RememberMe',
          'rememberMe',
          Input,
          null,
          'checkbox',
        )}{' '}
        <span className={s.loginText}>remember me</span>
      </div>
      <div>
        <button className={s.loginButton}> Log in </button>
      </div>
      {captcha ? (
        <div className={s.captcha}>
          <img src={captcha} alt={'captcha'} />
          {createField(
            'Captcha',
            'captcha',
            Input,
            [required, maxLen],
            null,
          )}{' '}
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

const ReduxLogin = reduxForm({
  form: 'login',
})(LoginForm);

const Login = ({ isLoggedIn, login, captcha }) => {
  if (isLoggedIn) return <Navigate to={'/profile'} />;

  const maxLen40 = maxLen(40);

  const onSubmit = (payload) => {
    login(
      payload.email,
      payload.password,
      payload.rememberMe,
      payload.captcha,
    );
  };

  return (
    <div className={s.body}>
      <h1 className={s.loginText}>Login</h1>
      <ReduxLogin
        maxLen={maxLen40}
        onSubmit={onSubmit}
        captcha={captcha}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  captcha: state.auth.captchaURL,
});

export default compose(
  connect(mapStateToProps, { login }))
(Login);
