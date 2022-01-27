let defaultState = {
    profileData: { id: 0, name: "Me", pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u0.jpg")} alt='My pfp' /> },
}

const userReducer = (state = defaultState, action) => {

    switch (action.type) {

        default: return (state);

    }
}

export default userReducer;