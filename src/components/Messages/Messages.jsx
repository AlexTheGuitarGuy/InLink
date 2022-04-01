import React from 'react';
import { Route, Routes } from 'react-router-dom';
import s from './Messages.module.css';
import UserMessage from './UserMessage/UserMessage';
import Users from './Users/Users';
import SendText from './SendText/SendText';

const Messages = (props) => {
  const userDialogElements = [];
  for (let i = 0; i < props.state.userMessages.length; i++) {
    userDialogElements[i] = props.state.userMessages[i].map((e) => {
      return (
        <div key={e.id}>
          <UserMessage
            message={e}
            theirPfp={props.state.users[i].pfp}
            myPfp={props.profileData.pfp}
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
            <SendText
              memoryText={props.memoryText}
              send={props.send}
              id={i}
            />
          </div>
        }
      />
    );
  });

  return (
    <div className={s.repartition}>
      <div className={s.dialogPeople}>
        <Users state={props.state.users} />
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
                  memoryText={props.memoryText}
                  send={props.send}
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
