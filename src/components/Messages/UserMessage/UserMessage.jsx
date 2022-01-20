import React from 'react';
import s from './UserMessages.module.css';

const UserMessage = (props) => {
    let showMessages = () => {
        if (props.message.from === "me") {
            return (
                <div>
                    <div className={s.myPfp}>
                        {props.myPfp}
                    </div>
                    <div className={s.fromMe}>
                        {props.message.text}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className={s.theirPfp}>
                        {props.theirPfp}
                    </div>
                    <div className={s.fromThem}>
                        {props.message.text}
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            {showMessages()}
        </div>
    );
}

export default UserMessage;