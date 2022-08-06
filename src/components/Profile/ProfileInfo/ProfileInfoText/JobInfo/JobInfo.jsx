import React from 'react';

const JobInfo = ({ lookingForAJob, lookingForAJobDescription }) => {
  return (
    <div className="w-full">
      {lookingForAJob && (
        <div
          className="border rounded-lg border-gray-300
                     bg-gray-200
                     p-4
                     text-gray-700
                     flex items-center flex-col"
        >
          <div className="order-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png"
              alt="looking for job"
              className="w-5 h-5 inline"
            />
            is looking for a job
          </div>

          <div className="order-2 text-center">
            {lookingForAJobDescription ? '"' + lookingForAJobDescription + '"' : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobInfo;
