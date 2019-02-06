import { GET_BOXES, GET_BOX } from "../constants/type";
import Api from "../utils/api";
import { EndPoints } from "../constants/endpoints";

export const getBoxes = () => {
    return (dispatch) => {
        return {
            type: GET_BOXES,
            payload: () => {
                return Api.get( EndPoints.boxes());
            }
        };
    };
}

export const getBox = (boxId) => {
    return (dispatch) => {
        return {
            type: GET_BOX,
            payload: () => {
                return Api.get( EndPoints.boxes(boxId));
            }
        };
    };
}