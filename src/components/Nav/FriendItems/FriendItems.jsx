import React from 'react'
import s from './FriendItems.module.css'

const FriendItems = (props) => {

    let friendList = props.friends.map(e => {
        return (
            <div className={s.friendItem}>
                {e.pfp}
                <div className={s.friendName}>
                    {e.name[0] + e.name[1][0] + e.name[1][1] + '.'}
                </div>
            </div>
        )
    });

    return (
        <div className={s.friendList}>
            <div className={s.friendsText}>
                Buddies:
            </div>
            <div>
                {friendList}
            </div>
        </div>
    )
}


export default FriendItems;

