import React from 'react';
import {
  createField,
  Input,
  Textarea,
} from '../../../../common/FormControls/FormControls';

const JobInfo = ({ maxLen, lookingForAJob }) => {
  return (
    <div
      className={`border-2 border-slate-800 
                         rounded bg-slate-600 
                         p-2 mt-2 text-white`}
    >
      <span className={'content flex justify-center mr-5'}>
        <span className={'mr-2'}>
          {createField(
            'isLookingForJob',
            'lookingForAJob',
            Input,
            null,
            'checkbox',
          )}
        </span>
        is looking for a job
      </span>

      {lookingForAJob && (
        <div
          className={
            'flex flex-col justify-center items-center text-black mt-2'
          }
        >
          {createField(
            'Please enter your skills...',
            'lookingForAJobDescription',
            Textarea,
            [maxLen],
            null,
          )}
        </div>
      )}
    </div>
  );
};

export default JobInfo;
