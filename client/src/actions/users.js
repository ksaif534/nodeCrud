import * as api from '../api';
import { USERPROFILE, EDITPROFILE, UPDATEPROFILE, DELETEPROFILE } from '../constants/actionTypes';

export const getProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.getProfile(id);
        dispatch({ type: USERPROFILE, payload: data });
        return {data};
    } catch (error) {
        console.log(error);
    }
}

export const editProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.editProfile(id);
        dispatch({ type: EDITPROFILE, payload: data });
        return {data};
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = (formData,id) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(formData,id);
        dispatch({ type: UPDATEPROFILE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteProfile(id);
    } catch (error) {
        console.log(error);
    }
}