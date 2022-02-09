import React from 'react'
import s from './FriendItems.module.css'

const FriendItems = (props) => {

    let friendList = props.friends.map(e => {
        return (
            <div className={s.friendItem} key = {e.id}>
                {e.pfp}
                <div className={s.friendName}>
                    {e.name[0] + ' ' + e.name[1][0] + '.'}
                </div>
            </div>
        )
    });

    return (
        <div className={s.friendList}>
            <div className={s.friendsText}>
                Buddies:
            </div>
            <div className={s.friendElems}>
                {friendList}
            </div>
        </div>
    )
}


export default FriendItems;

