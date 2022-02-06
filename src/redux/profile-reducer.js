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
        case STORE_POST_TEXT: {
            return {
                ...state,
                storedText: action.text,
            }
        }
        case ADD_POST: {
            if (state.storedText !== '' && state.storedText !== '\n') {
                
                return {
                    ...state,
                    posts: [...state.posts, {
                        id: state.posts.length + 1,
                        text: state.storedText,
                        likes: 0,
                    }],
                    storedText: '',
                }

            }

            return {
                ...state,
                storedText: '',
            }
        }
        default: return (state);
    }

}

export const storePostTextActionCreator = (text) => ({ type: STORE_POST_TEXT, text: text });
export const addPostActionCreator = () => ({ type: ADD_POST });

export default profileReducer;