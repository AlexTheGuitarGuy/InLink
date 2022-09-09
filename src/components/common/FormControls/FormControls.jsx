import { Field } from 'redux-form';
import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

const FormControl = ({ meta, children }) => {
  const { touched, error } = meta;
  const hasError = touched && error;
  return (
    <>
      {hasError ? (
        <>
          <span className="text-red-700">{children}</span>

          <span
            className={cn(
              `bg-red-100 border border-red-400 text-red-700 px-2 ml-2 
            rounded absolute whitespace-nowrap`,
            )}
          >
            {error}
          </span>
        </>
      ) : (
        <>{children}</>
      )}
    </>
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

export const createField = (placeholder, name, component, validators, type, props) => {
  return (
    <Field
      placeholder={placeholder}
      name={name}
      component={component}
      validate={validators}
      type={type}
      props={{ ...props }}
    />
  );
};
