import React from 'react'
import s from "./Users.module.css"

const Users = (props) => {
    let mappedUsers = props.state.users.map((e) => {
        let changeFollowStatus = () => {
            props.changeFollowStatus(e.id);
        }

        return (
            <div className={s.user} key={e.id}>
                <div>
                    {e.pfp}
                </div>
                <div>
                    {e.name}
                </div>
                <button onClick={changeFollowStatus}>
                    {e.isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>
        )
    })

    return (
        <div>
            {mappedUsers}
        </div>
    )
}

export default Users;