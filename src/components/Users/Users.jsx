import React from 'react'
import s from "./Users.module.css"

const Users = (props) => {
    if (props.state.users.length === 0) {
        debugger;
        props.setUsers([
            {
                id: 1,
                name: ["Boy", "Nextdoor"],
                bio: "Get up you lazy cow. Where's my breakfast?",
                location: { country: "Belarus", city: "Minsk" },
                isFollowing: true,
                pfp: <img src={require("../../redux/photos/UsersPfp/u1.jpg")} alt='User1 pfp' />
            },
            {
                id: 2,
                name: ["Fucking", "Slave"],
                bio: "LIKE EMBARRASSING ME, HUH?",
                location: { country: "Ukraine", city: "Kyiv" },
                isFollowing: false,
                pfp: <img src={require("../../redux/photos/UsersPfp/u2.png")} alt='User2 pfp' />
            },
            {
                id: 3,
                name: ["Boss", "Of This Gym"],
                bio: "Ok maggots i wanna see six hot loads on your di's hat, now",
                location: { country: "Japan", city: "Tokyo" },
                isFollowing: true,
                pfp: <img src={require("../../redux/photos/UsersPfp/u3.jpg")} alt='User3 pfp' />
            },
            {
                id: 4,
                name: ["Dungeon", "Master"],
                bio: "I'm an artist. I'm a performance artist.",
                location: { country: "United states", city: "Los Angeles" },
                isFollowing: false,
                pfp: <img src={require("../../redux/photos/UsersPfp/u4.jpg")} alt='User4 pfp' />
            },
        ])
    }

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