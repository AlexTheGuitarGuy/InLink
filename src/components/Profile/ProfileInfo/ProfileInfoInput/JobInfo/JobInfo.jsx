import React from 'react';
import {
  createField,
  Input,
  Textarea,
} from '../../../../common/FormControls/FormControls';

const JobInfo = ({ maxLen, lookingForAJob }) => {
  return (
    <div
      className="border rounded-lg border-gray-300
                     bg-gray-200
                     p-4 
                     text-gray-700
                     flex items-center flex-col"
    >
      <div className="order-1">
        <div className="mr-1 mt-1 inline">
          {createField(
            'isLookingForJob',
            'lookingForAJob',
            Input,
            null,
            'checkbox',
          )}
        </div>
        is looking for a job
      </div>

      {lookingForAJob && (
        <div className="order-2 mt-2">
          {createField(
            'Please enter your skills...',
            'lookingForAJobDescription',
            Textarea,
            [maxLen],
            null,
            {
              className: `resize-none py-1 px-4 rounded 
                border border-gray-300
                focus:outline-none focus:border-gray-500
                transition`,
            },
          )}
        </div>
      )}
    </div>
  );
};

export default JobInfo;
