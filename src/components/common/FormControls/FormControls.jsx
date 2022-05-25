import s from './FormControls.module.css';
import { Field } from 'redux-form';
import React from 'react';

const FormControl = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <span className={s.text + ' ' + (hasError ? s.error : '')}>
      {children}
      {hasError && <span>{error}</span>}
    </span>
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

export const createField = (
  placeholder,
  name,
  component,
  validators,
  type,
) => {
  return (
    <Field
      placeholder={placeholder}
      name={name}
      component={component}
      validate={validators}
      type={type}
    />
  );
};
