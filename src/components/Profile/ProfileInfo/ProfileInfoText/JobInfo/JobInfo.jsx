import React from 'react';

const JobInfo = ({ lookingForAJob, lookingForAJobDescription }) => {
  return (
    <span>
      {lookingForAJob && (
        <div
          className={`border-2 border-slate-800 
                         rounded bg-slate-600 
                         p-2 mt-2 text-white`}
        >
          <span className={'content flex justify-center mb-2 mr-5'}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png"
              alt="looking for job"
              className={'w-5 h-5 mt-0.5 mr-1'}
            />
            is looking for a job
          </span>

          <div className={'text-center'}>
            {lookingForAJobDescription
              ? '"' + lookingForAJobDescription + '"'
              : null}
          </div>
        </div>
      )}
    </span>
  );
};

export default JobInfo;
