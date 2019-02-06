import { SET_USER, GET_USER, GET_PURCHASES, EDIT_USER, EDIT_PASSWORD, DELETE_USER } from "../constants/type";
import Api from "../utils/api";
import { EndPoints } from "../constants/endpoints";

export const setUser = (data) => {
    return {
        type: SET_USER,
        data: data
    };
}


export const getUser = (userId) => {
    return (dispatch) => {
        return {
            type: GET_USER,
            payload: () => {
                return Api.get( EndPoints.user(userId));
            }
        };
    };
}

export const editUser = (userId, data) => {
    return (dispatch) => {
        return {
            type: EDIT_USER,
            payload: () => {
                return Api.put( EndPoints.user(userId), data ).then( (result) => {
                    if( result.status < 300 ){
                        dispatch(setUser(result.data));
                    }
                    return result;
                });
            }
        };
    };
}

export const editPassword = (userId, data) => {
    return (dispatch) => {
        return {
            type: EDIT_PASSWORD,
            payload: () => {
                return Api.put( EndPoints.user(userId, "password"), data );
            }
        };
    };
}


export const getPurchases = (userId) => {
    return (dispatch) => {
        return {
            type: GET_PURCHASES,
            payload: () => {
                return Api.get( EndPoints.user(userId, "purchases"));
            }
        };
    };
}

export const deleteUser = (userId) => {
    return (dispatch) => {
        return {
            type: DELETE_USER,
            payload: () => {
                return Api.delete( EndPoints.user(userId));
            }
        };
    };
}