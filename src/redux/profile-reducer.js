const STORE_POST_TEXT = 'STORE-POST-TEXT';
const ADD_POST = 'ADD-POST';

let defaultState = {
    posts: [
        { id: 1, text: 'Swallow my cum ;)', likes: 420 },
        { id: 2, text: 'Futeo nahui', likes: 228 },
        { id: 3, text: 'Welcome to the club, buddy.', likes: 69 },
    ],
    storedText: '',
}

const profileReducer = (state = defaultState, action) => {

    switch (action.type) {
        case STORE_POST_TEXT:

            state.storedText = action.text;
            return (state);
        case ADD_POST:
            if (state.storedText !== '' && state.storedText !== '\n') {
                let newPost = {
                    id: state.posts.length + 1,
                    text: state.storedText,
                    likes: 0,
                };
                state.posts.push(newPost);

            }
            
            state.storedText = '';
            return (state);
        default: return (state);
    }

}

export const storePostTextActionCreator = (text) => ({type:STORE_POST_TEXT, text: text});
export const addPostActionCreator = () => ({type:ADD_POST});

export default profileReducer;