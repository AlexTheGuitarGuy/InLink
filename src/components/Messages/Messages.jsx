import React from 'react';
import { Route, Routes } from 'react-router-dom';
import s from './Messages.module.css';
import UserMessage from './UserMessage/UserMessage';
import Users from './Users/Users';
import SendText from './SendText/SendText';
import SendTextContainer from './SendText/SendTextContainer';

const Messages = (props) => {

    let userDialogElements = [];
    for (let i = 0; i < props.state.userMessages.length; i++) {
        userDialogElements[i] = props.state.userMessages[i].map(e => {
            return (
                <div >
                    <UserMessage message={e} theirPfp={props.state.users[i].pfp} myPfp={props.profileData.pfp} />
                </div>
            );
        });
    }

    return (
        <div className={s.repartition}>
            <div className={s.dialogs}>
                <Users state={props.state.users} />
            </div>
            <div className={s.messages}>
                <Routes>
                    <Route exact strict path='/' element={userDialogElements} />

                </Routes>
                <SendTextContainer store = {props.store}/>
            </div>

        </div >
    );
}

export default Messages;