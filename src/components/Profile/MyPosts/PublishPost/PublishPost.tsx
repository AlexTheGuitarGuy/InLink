import React from 'react';
import { post } from '../../../../redux/profile-reducer';
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

type PostFormValues = {
  postText: string;
};

const PublishPost = () => {
  const dispatch = useDispatch();

  const initialValues: PostFormValues = {
    postText: '',
  };

  const validate = ({ postText }: PostFormValues) => {
    const errors: FormikErrors<PostFormValues> = {};
    if (postText.length > 512) errors.postText = 'Post is too long';

    return errors;
  };

  const onSubmit = ({ postText }: PostFormValues, { resetForm }: FormikHelpers<PostFormValues>) => {
    if (postText.trim()) {
      dispatch(post(postText));
      resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
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
