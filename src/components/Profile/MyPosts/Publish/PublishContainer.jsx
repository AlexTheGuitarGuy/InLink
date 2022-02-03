
import { storePostTextActionCreator, addPostActionCreator } from '../../../../redux/profile-reducer';
import Publish from './Publish';
import { connect } from 'react-redux'

// const hui = () => {

//     return (
//         <StoreContext.Consumer>{
//             (store) => {
//                 let memoryText = store.getState().profilePage.storedText;

//                 let post = () => {

//                     store.dispatch(addPostActionCreator());
//                 }

//                 let storeText = (text) => {
//                     store.dispatch(storePostTextActionCreator(text));
//                 }

//                 return (<Publish storeText={storeText}
//                     post={post}
//                     memoryText={memoryText} />)
//             }
//         }
//         </StoreContext.Consumer>
//     )
// }

let mapDispatchToProps = (dispatch) => {
    return {
        storeText: (text) => {dispatch(storePostTextActionCreator(text))},
        post: () => {dispatch(addPostActionCreator())},
    }
}

let mapStateToProps = (state) => {

    return {
        memoryText: state.profilePage.storedText,
    }
}

export const PublishContainer = connect(mapDispatchToProps, mapStateToProps)(Publish);

//export default PublishContainer;