import React, { FC, useEffect, useState } from 'react';
import { sendMessage } from '../../../redux/dialogs-reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
} from 'formik';

type MessageFormValues = {
  messageText: string;
};

type SendTextProps = {
  id: number;
};

const SendText: FC<SendTextProps> = ({ id }) => {
  const dispatch = useDispatch();

  const initialValues = {
    messageText: '',
  };

  const validate = ({ messageText }: MessageFormValues) => {
    const errors: FormikErrors<MessageFormValues> = {};
    if (messageText.length > 256) errors.messageText = 'Message is too long';

    return errors;
  };

  const onSubmit = (
    { messageText }: MessageFormValues,
    { resetForm, setSubmitting }: FormikHelpers<MessageFormValues>,
  ) => {
    if (messageText.trim()) {
      dispatch(sendMessage(id, messageText));
      resetForm();
    }
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }: FormikProps<MessageFormValues>) => (
        <Form>
          <div className="flex flex-row justify-center">
            <Field
              as="textarea"
              type="text"
              name="messageText"
              placeholder="Enter your message"
              className="resize-none w-full rounded-lg p-2 
              border border-gray-300
              focus:outline-none focus:border-gray-500
              transition"
            />
            <ErrorMessage
              name="messageText"
              component="div"
              className="bg-red-100 border border-red-400 text-red-700 px-2 ml-2 
                      rounded absolute whitespace-nowrap"
            />

            <div>
              <button
                disabled={isSubmitting || !isValid}
                type="submit"
                className="bg-gray-400 hover:bg-gray-500 active:bg-gray-600
                          text-gray-100 text-center
                          rounded-full ml-4 px-2 py-2 mt-2
                          transition-colors cursor-pointer
                          focus:outline-none focus:ring-0"
              >
                <img
                  src={require('../../../assets/send.png')}
                  alt="Send"
                  className="w-8 h-8 mr-3"
                />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SendText;
