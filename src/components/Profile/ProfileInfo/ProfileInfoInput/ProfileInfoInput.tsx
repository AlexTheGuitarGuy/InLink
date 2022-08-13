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

interface Props
  extends Partial<InjectedFormProps>,
    Partial<WrappedFieldArrayProps>,
    ProfileInfoProps {}

const ProfileInfoInputForm: FC<InjectedFormProps<ProfileData, Props> & Props> = ({
  handleSubmit,
  ...props
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <CommonProfile {...props} />
    </form>
  );
};

const ReduxProfileInfoInputForm = reduxForm<ProfileData, Props>({
  form: 'profileInfo',
})(ProfileInfoInputForm);

const ProfileInfoInput: FC<any> = (props) => {
  const maxLen50 = maxLen(50);
  const maxLen1000 = maxLen(1000);
  const dispatch = useAppDispatch();

  const handleSubmit = (payload: ProfileData) => {
    (dispatch(uploadProfileInfo(payload)) as unknown as Promise<string>).then((message: string) => {
      dispatch(setAlert({ message, type: 'success' }));
    });
  };

  return (
    <ProfileInfoInputForm
      onSubmit={handleSubmit}
      {...props}
      maxLen={maxLen1000}
      initialValues={props.profileData}
    />
  );
};

export default memo(ProfileInfoInput);
