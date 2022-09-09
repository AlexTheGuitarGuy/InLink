import React, { memo, FC, FormEventHandler } from 'react';
import { reduxForm, InjectedFormProps, WrappedFieldArrayProps } from 'redux-form';
import { maxLen } from '../../../../utils/validators/validators';
import { useDispatch } from 'react-redux';
import { uploadProfileInfo } from '../../../../redux/profile-reducer';
import CommonProfile from '../CommonProfile/CommonProfile';
import { setAlert } from '../../../../redux/app-reducer';
import { ProfileData } from '../../../../types/types';
import { ProfileInfoProps } from '../../Profile';
import { useAppDispatch } from '../../../../hooks/reduxHooks';

const ProfileInfoInputForm = ({ handleSubmit, ...props }) => {
  return (
    <form onSubmit={handleSubmit}>
      <CommonProfile {...props} />
    </form>
  );
};

const ReduxProfileInfoInputForm = reduxForm({
  form: 'profileInfo',
})(ProfileInfoInputForm);

const ProfileInfoInput = (props) => {
  const maxLen50 = maxLen(50);
  const maxLen1000 = maxLen(1000);
  const dispatch = useAppDispatch();

  const handleSubmit = (payload) => {
    dispatch(uploadProfileInfo(payload)).then((message) => {
      dispatch(setAlert({ message, type: 'success' }));
    });
  };

  return (
    <ReduxProfileInfoInputForm
      onSubmit={handleSubmit}
      {...props}
      maxLen={maxLen1000}
      initialValues={props.profileData}
    />
  );
};

export default memo(ProfileInfoInput);
