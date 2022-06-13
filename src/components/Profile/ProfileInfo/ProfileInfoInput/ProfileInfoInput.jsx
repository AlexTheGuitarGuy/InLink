import React, { memo } from 'react';
import { formValueSelector, reduxForm } from 'redux-form';
import { maxLen } from '../../../../utils/validators/validators';
import {
  createField,
  Input,
} from '../../../common/FormControls/FormControls';
import s from '../ProfileInfoText/ProfileInfoText.module.css';
import placeholder from '../../../../assets/pfps/placeholder.jpg';
import Status from '../Status/Status';
import banner from '../../../../assets/banner.jpg';
import JobInfo from './JobInfo/JobInfo';
import Contacts from './Contacts/Contacts';
import e from '../../../common/FormControls/FormControls.module.css';
import { connect } from 'react-redux';

let ProfileInfoInputForm = ({
  profileStatus,
  pfp,
  updateStatus,
  isOwner,
  uploadPFP,
  handleSubmit,
  profileData: { contacts },
  error,
  lookingForAJob,
  maxLen1000,
}) => {
  const updatePFP = (e) => {
    if (e.target.files.length) uploadPFP(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <img
        src={banner}
        alt="banner"
        className={s.banner + ' w-full'}
      />

      {error && <div className={e.summaryError}>{error}</div>}

      <div className={s.pfpAndDetails}>
        <div className={s.pfp}>
          <img src={pfp || placeholder} alt={'pfp'} />
        </div>

        <span className={s.jobInfo}>
          <span className={'grid'}>
            {isOwner ? <button>Save</button> : null}
          </span>

          <input type={'file'} onChange={updatePFP} />

          <JobInfo
            lookingForAJob={lookingForAJob}
            maxLen={maxLen1000}
          />
        </span>

        <div className={s.details}>
          <span className={s.username}>
            <span
              className={
                'flex flex-col justify-center items-center text-black'
              }
            >
              {createField(
                'Please insert your name...',
                'fullName',
                Input,
                null,
                null,
              )}
            </span>
          </span>

          <span className={s.status}>
            <Status
              status={profileStatus}
              updateStatus={updateStatus}
              isOwner={isOwner}
            />
          </span>

          <span className={s.contacts}>
            <Contacts contacts={contacts} />
          </span>
        </div>
      </div>
    </form>
  );
};

ProfileInfoInputForm = reduxForm({
  form: 'profileInfo',
})(ProfileInfoInputForm);

const selector = formValueSelector('profileInfo');
ProfileInfoInputForm = connect((state) => {
  const lookingForAJob = selector(state, 'lookingForAJob');
  return {
    lookingForAJob,
  };
})(ProfileInfoInputForm);

const ProfileInfoInput = (props) => {
  const maxLen50 = maxLen(50);
  const maxLen1000 = maxLen(1000);

  const onSubmit = (payload) => {
    props.uploadProfileInfo(payload);
  };

  return (
    <ProfileInfoInputForm
      onSubmit={onSubmit}
      {...props}
      maxLen50={maxLen50}
      maxLen1000={maxLen1000}
      initialValues={props.profileData}
    />
  );
};

export default memo(ProfileInfoInput);
