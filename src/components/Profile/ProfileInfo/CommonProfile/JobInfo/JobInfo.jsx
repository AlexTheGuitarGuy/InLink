import React from 'react';
import { createField, Input, Textarea } from '../../../../common/FormControls/FormControls';
import { formValueSelector } from 'redux-form';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const JobInfo = ({ maxLen, lookingForAJobDescription, isEditing, reduxLookingForAJob }) => {
  const lookingForAJob = useSelector((state) =>
    formValueSelector('profileInfo')(state, 'lookingForAJob'),
  );

  return (
    <div className={cn({ 'w-full': !isEditing })}>
      {(reduxLookingForAJob || isEditing) && (
        <div
          className={cn(
            `border rounded-lg border-gray-300
              bg-gray-200
              p-4 
              text-gray-700
              flex items-center flex-col`,
            { 'w-full': isEditing },
          )}
        >
          <div className="order-1">
            {isEditing ? (
              <div className="mr-1 mt-1 inline">
                {createField('isLookingForJob', 'lookingForAJob', Input, null, 'checkbox')}
              </div>
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png"
                alt="looking for job"
                className="w-5 h-5 inline"
              />
            )}
            is looking for a job
          </div>

          <div className="order-2 mt-2 text-center w-full">
            {lookingForAJob && isEditing
              ? createField(
                  'Please enter your skills...',
                  'lookingForAJobDescription',
                  Textarea,
                  [maxLen],
                  null,
                  {
                    className: `resize-none py-1 px-4 rounded 
                border border-gray-300
                w-full
                focus:outline-none focus:border-gray-500
                transition`,
                  },
                )
              : lookingForAJobDescription && !isEditing
              ? '"' + lookingForAJobDescription + '"'
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobInfo;
