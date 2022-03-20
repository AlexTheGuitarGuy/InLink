import s from './Description.module.css';

export const Description = ({ isEditing, aboutMe, editMode }) => {
  return (
    <div>
      {(!isEditing && (
        <div
          className={s.descriptionText}
          onClick={() => editMode(true)}
        >
          {aboutMe}
        </div>
      )) ||
        (isEditing && (
          <input
            className={s.descriptionEdit}
            autoFocus={true}
            onBlur={() => editMode(false)}
            defaultValue={aboutMe}
          />
        ))}
    </div>
  );
};
