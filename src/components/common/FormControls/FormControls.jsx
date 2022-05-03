import s from './FormControls.module.css';

const FormControl = ({ input, meta, child, ...restProps }) => {
  const hasError = meta && meta.touched && meta.error;
  return (
    <div className={s.text + ' ' + (hasError ? s.error : '')}>
      {restProps.children}
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};
