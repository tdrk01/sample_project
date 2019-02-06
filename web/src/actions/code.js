import { CHECK_CODE, SET_CODE } from "../constants/type";
import Api from "../utils/api";
import { EndPoints } from "../constants/endpoints";


export const checkCode = (data) => {
    return (dispatch) => {
        return {
            type: CHECK_CODE,
            payload: () => {
                return Api.post( EndPoints.codes("check"), data);
            }
        };
    };
}

export const setCode = (data) => {
    return {
        type: SET_CODE,
        data: data
    };
}