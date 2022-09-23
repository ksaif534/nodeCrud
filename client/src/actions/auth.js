import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        // Log in the User ..
        const { data } = await api.signIn(formData);
        dispatch({type:AUTH, data});
        navigate('/posts');
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        // Sign up the User ..
        const { data } = await api.signUp(formData);
        dispatch({type:AUTH, data});
        navigate('/auth');
    } catch (error) {
        console.log(error);
    }
}