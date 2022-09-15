import React from 'react';
import { useDispatch } from 'react-redux';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
} from 'formik';
import * as Yup from 'yup';

import { post } from '../../../../redux/profile-reducer/profile-reducer';

type PostFormValues = {
  postText: string;
};

const PublishPost = () => {
  const dispatch = useDispatch();

  const initialValues: PostFormValues = {
    postText: '',
  };

  const validationSchema = Yup.object({
    postText: Yup.string()
      .trim()
      .required('Cannot publish empty post')
      .max(512, 'Post too long. Maximum is 512 characters.'),
  });

  const onSubmit = ({ postText }: PostFormValues, { resetForm }: FormikHelpers<PostFormValues>) => {
    if (postText.trim()) {
      dispatch(post(postText));
      resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }: FormikProps<PostFormValues>) => (
        <Form>
          <label htmlFor="postText" className="lg:text-lg xl:text-2xl xl:mb-2">
            New post
          </label>
          <Field
            as="textarea"
            type="text"
            name="postText"
            placeholder="Type what you think..."
            className="resize-none py-2 px-4 rounded w-full
              border border-gray-300
              focus:outline-none focus:border-gray-500
              transition"
            id="postText"
          />
          <ErrorMessage
            name="postText"
            component="div"
            className="bg-red-100 border border-red-400 text-red-700 px-2 ml-2 
                      rounded absolute whitespace-nowrap"
          />

          <button
            disabled={isSubmitting || !isValid}
            type="submit"
            className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700
                      text-gray-100 text-center font-semibold text-sm

                      lg:py-1.5
                      sm:py-0.5 px-4 

                      rounded w-full
                      transition-colors cursor-pointer
                      focus:outline-none focus:ring-0"
          >
            Publish
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PublishPost;
