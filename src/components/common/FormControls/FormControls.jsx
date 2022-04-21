import s from './FormControls.module.css';

export const Input = ({ input, meta, ...props }) => {
  const hasError = meta && meta.touched && meta.error;
  return (
    <div className={s.input + ' ' + (hasError ? s.error : '')}>
      <input {...input} {...props} />
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};
