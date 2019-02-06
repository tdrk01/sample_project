import { GET_CONTENTS, GET_CONTENT } from "../constants/type";
import Api from "../utils/api";
import { EndPoints } from "../constants/endpoints";

export const getContents = () => {
    return (dispatch) => {
        return {
            type: GET_CONTENTS,
            payload: () => {
                return Api.get( EndPoints.contents(), {
                    display_priority: true
                });
            }
        };
    };
}

export const getContent = (hash) => {
    return (dispatch) => {
        return {
            type: GET_CONTENT,
            payload: () => {
                return Api.get( EndPoints.contents(hash));
            }
        };
    };
}