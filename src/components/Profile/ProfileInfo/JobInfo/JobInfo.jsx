import s from './JobInfo.module.css';

const JobInfo = ({profileData}) => {
  return <>
    {profileData.lookingForAJob && (
      <div className={s.job}>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png"
            alt="looking for job"
          />
          <span className={s.jobText}>
                {'is looking for a job'}
              </span>
          <div className={s.jobDescription}>
            {'"' +
              profileData.lookingForAJobDescription +
              '"'}
          </div>
        </div>
      </div>
    )}
  </>
}

export default JobInfo;