import React from 'react';
import { Route, Routes } from 'react-router-dom';
import s from './Messages.module.css';
import UserMessage from './UserMessage/UserMessage';
import Users from './Users/Users';
import SendText from './SendText/SendText';

const Messages = ({
  state: { userMessages, users },
  profileData,
  memoryText,
  send,
}) => {
  const userDialogElements = [];
  for (let i = 0; i < userMessages.length; i++) {
    userDialogElements[i] = userMessages[i].map((e) => {
      return (
        <div key={e.id}>
          <UserMessage
            message={e}
            theirPfp={users[i].pfp}
            myPfp={profileData.pfp}
          />
        </div>
      );
    });
  }

  const routes = userDialogElements.map((e, i) => {
    return (
      <Route
        exact
        strict
        path={'/' + (i + 1)}
        key={i}
        element={
          <div className={s.dialog}>
            {userDialogElements[i]}
            <SendText memoryText={memoryText} send={send} id={i} />
          </div>
        }
      />
    );
  });

  return (
    <div className={s.repartition}>
      <div className={s.dialogPeople}>
        <Users users={users} />
      </div>
      <div className={s.dialogs}>
        <Routes>
          <Route
            exact
            strict
            path="/"
            element={
              <div className={s.dialog}>
                {userDialogElements[0]}
                <SendText
                  memoryText={memoryText}
                  send={send}
                  id={0}
                />
              </div>
            }
          />
          {routes}
        </Routes>
      </div>
    </div>
  );
};

export default Messages;
