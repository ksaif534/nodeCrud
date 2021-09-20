import { FETCH_ALL, UPDATE, CREATE, DELETE, LIKE} from "../constants/actionTypes";

const reducerPost = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL :
            return action.payload;
        case CREATE :
            return [ ...posts, action.payload];
        case UPDATE :
        case LIKE :    
            posts.map((post) =>{
                if (post._id === action.payload._id) {
                    return action.paylaod;
                }else{
                    return post;
                }
            });
            break;
        case DELETE :
            return posts.filter((post) => post._id !== action.paylaod);
        default:
            return posts;
    }
}
export default reducerPost;