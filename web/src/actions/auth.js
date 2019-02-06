import { SET_TMPDATA, SET_AUTHDATA, CHECK_EMAIL, REGISTER, SET_REDIRECT, LOGIN, LOGOUT, FORGOT, RESET, CHECK_AUTH } from "../constants/type";
import Api from "../utils/api";
import { EndPoints } from "../constants/endpoints";
import ReactGA from 'react-ga';
import { setUser } from "./user";

export const setTmpData = (data) => {
    return (dispatch) => {
        return {
            type: SET_TMPDATA,
            data: data
        };
    };
}

export const checkEmail = (email) => {
    return (dispatch) => {
        return {
            type: CHECK_EMAIL,
            payload: () => {
                return Api.post( EndPoints.users("email"), {email: email} );
            }
        };
    };
};

export const register = (data) => {
    return (dispatch) => {
        return {
            type: REGISTER,
            payload: () => {
                return Api.post( EndPoints.users(), data ).then( (result) => {
                    if( result.status < 300 ){
                        dispatch(setAuthDate(result.data.id, result.response.data.auth_token));
                        dispatch(setUser(result.data));
                    }
                    return result;
                });
            }
        };
    };
};

export const setAuthDate = ( userId, token ) => {
    if( process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0 ){
      ReactGA.set({ userId: userId });
    }

    return {
        type: SET_AUTHDATA,
        userId: userId,
        token: token
    };
}

export const setRedirectTo = (redirectTo) => {
    return {
        type: SET_REDIRECT,
        redirectTo: redirectTo
    };
}

export const login = (data) => {
    return (dispatch) => {
        return {
            type: LOGIN,
            payload: () => {
                return Api.post( EndPoints.users("login"), data ).then( (result) => {
                    if( result.status < 300 ){
                        dispatch(setAuthDate(result.data.id, result.response.data.auth_token));
                        dispatch(setUser(result.data));
                    }
                    return result;
                });
            }
        };
    };
}

export const logout = () => {
    return (dispatch) => {
        dispatch(setAuthDate(null, null));
        dispatch(setUser({}));
        return {
            type: LOGOUT,
        };
    };
}

export const forget = (data) => {
    return (dispatch) => {
        return {
            type: FORGOT,
            payload: () => {
                return Api.post( EndPoints.users("forget"), data );
            }
        };
    };
};

export const reset = (data) => {
    return (dispatch) => {
        return {
            type: RESET,
            payload: () => {
                return Api.post( EndPoints.users("reset"), data );
            }
        };
    };
};