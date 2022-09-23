import { USERPROFILE, EDITPROFILE, UPDATEPROFILE } from "../constants/actionTypes";

const userReducer = (state = { userData:null }, action) => {
    switch (action.type) {
        case USERPROFILE:
            return { ...state, userData: action?.data };
        case EDITPROFILE:
            return { ...state, userData: action?.data };
        case UPDATEPROFILE:
            return { ...state, userData: action?.data };
        default:
            return state;
    }
}

export default userReducer;