import React, { ReactNode, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserMessage from './UserMessage/UserMessage';
import Users from './Users/Users';
import SendText from './SendText/SendText';
import placeholder from '../../assets/pfps/placeholder.jpg';
import { Navigate } from 'react-router';
import { getDialogsPage, getStoredText } from '../../redux/dialogs-selector';
import { useDispatch, useSelector } from 'react-redux';
import { getMyData } from '../../redux/profile-selector';
import Loading from '../common/Loading/Loading';
import { compose } from 'redux';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import useScreenSize from '../../hooks/useScreenSize';
import { UserMessage as UserMessageType } from '../../types/types';

const Messages = () => {
  const memoryText = useSelector(getStoredText);
  const { userMessages, users } = useSelector(getDialogsPage);
  const myData = useSelector(getMyData);

  const screenSize = useScreenSize();

  const conversationComponents: any = [];
  userMessages.map((conversation: UserMessageType[], conversationIndex: number) => {
    conversationComponents[conversationIndex] = [];

    conversation.map((message: UserMessageType, messageIndex: number) => {
      conversationComponents[conversationIndex][messageIndex] = (
        <div key={messageIndex}>
          <UserMessage message={message} />
        </div>
      );
    });
  });

  if (!myData) return <Loading />;

  const routes = conversationComponents.map((conversationComponent: ReactNode[], index: number) => {
    return (
      <Route
        path={`/${index}`}
        key={index}
        element={
          <div className="flex flex-col w-full relative">
            <div className="lg:mx-16 mb-32 overflow-scroll sm:mx-3 h-screen">
              {conversationComponents[index]}
            </div>
            <div
              className="fixed bottom-0 lg:w-3/5 sm:w-full self-center
              pb-4 rounded-t px-2 py-2 bg-gray-300"
            >
              <SendText id={index} />
            </div>
          </div>
        }
      />
    );
  });

  return (
    <div
      className="flex
         lg:bg-gray-100 lg:rounded-lg lg:p-8
         text-gray-700 lg:font-semibold
         h-screen w-full"
    >
      {screenSize.dynamicWidth >= 1366 && <Users users={users} />}

      <Routes>
        {screenSize.dynamicWidth < 1366 && <Route path="/all" element={<Users users={users} />} />}
        <Route path="/" element={<Navigate to={'1'} />} />
        {routes}
      </Routes>
    </div>
  );
};

export default compose(withAuthRedirect)(Messages);
