import { SET_ERROR, SET_MESSAGE, CLEAR_MESSAGE } from "../constants/type";

export const setError = (error) => {
    return {
        type: SET_ERROR,
        error: error,
    };
};

export const setMessage = (message) => {
    return {
        type: SET_MESSAGE,
        message: message,
    };
};

export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE
    }
};