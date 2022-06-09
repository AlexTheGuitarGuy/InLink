import React from 'react';
import { reduxForm } from 'redux-form';
import { maxLen, required } from '../../utils/validators/validators';
import {
  createField,
  Input,
} from '../common/FormControls/FormControls';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import e from '../common/FormControls/FormControls.module.css';
import { Navigate } from 'react-router-dom';
import { compose } from 'redux';

let LoginForm = ({ handleSubmit, error, maxLen, captcha }) => {
  return (
    <form onSubmit={handleSubmit} className={'mt-10'}>
      {error && <div className={e.summaryError}>{error}</div>}

      <div className={'mb-2 text-black'}>
        {createField(
          'Email',
          'email',
          Input,
          [required, maxLen],
          null,
        )}
      </div>
      <div className={'mb-2 text-black'}>
        {createField(
          'Password',
          'password',
          Input,
          [required, maxLen],
          'password',
        )}
      </div>
      <div className={'mb-2'}>
        {createField(
          'RememberMe',
          'rememberMe',
          Input,
          null,
          'checkbox',
        )}
        <span className={'mb-2'}>remember me</span>
      </div>
      <div>
        <button>Log in</button>
      </div>
      {captcha ? (
        <div className={'mt-2 text-black'}>
          <img src={captcha} alt={'captcha'} className={'mb-1'} />
          {createField(
            'Captcha',
            'captcha',
            Input,
            [required, maxLen],
            null,
          )}
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = ({ isLoggedIn, login, captcha }) => {
  if (isLoggedIn) return <Navigate to={'/profile'} />;

  const maxLen40 = maxLen(40);

  const onSubmit = ({ email, password, rememberMe, captcha }) => {
    login(email, password, rememberMe, captcha);
  };

  return (
    <LoginForm
      maxLen={maxLen40}
      onSubmit={onSubmit}
      captcha={captcha}
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  captcha: state.auth.captchaURL,
});

export default compose(connect(mapStateToProps, { login }))(Login);
