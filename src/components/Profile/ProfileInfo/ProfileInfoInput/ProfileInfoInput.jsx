import React, { memo } from 'react';
import { reduxForm } from 'redux-form';
import { maxLen } from '../../../../utils/validators/validators';
import { useDispatch } from 'react-redux';
import { uploadProfileInfo } from '../../../../redux/profile-reducer';
import CommonProfile from '../CommonProfile/CommonProfile';

let ProfileInfoInputForm = ({ handleSubmit, ...props }) => {
  return (
    <form onSubmit={handleSubmit}>
      <CommonProfile {...props} />
    </form>
  );
};

ProfileInfoInputForm = reduxForm({
  form: 'profileInfo',
})(ProfileInfoInputForm);

const ProfileInfoInput = (props) => {
  const maxLen50 = maxLen(50);
  const maxLen1000 = maxLen(1000);
  const dispatch = useDispatch();

  const handleSubmit = (payload) => {
    dispatch(uploadProfileInfo(payload));
  };

  return (
    <ProfileInfoInputForm
      onSubmit={handleSubmit}
      {...props}
      maxLen50={maxLen50}
      maxLen1000={maxLen1000}
      initialValues={props.profileData}
    />
  );
};

export default memo(ProfileInfoInput);
