import s from './JobInfo.module.css';
import React from 'react';

const JobInfo = ({ lookingForAJob, lookingForAJobDescription }) => {
  return (
    <>
      {lookingForAJob && (
        <div className={s.job}>
          <div className={s.align}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png"
              alt="looking for job"
            />
            <span className={s.jobText}>
              {'is looking for a job'}
            </span>
            <div className={s.jobDescription}>
              {'"' + lookingForAJobDescription + '"'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobInfo;
