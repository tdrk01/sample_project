import { DRAW_SAMPLE, GET_SAMPLE } from "../constants/type";
import Api from "../utils/api";
import { EndPoints } from "../constants/endpoints";


export const drawSample = () => {
    return (dispatch) => {
        return {
            type: DRAW_SAMPLE,
            payload: () => {
                return Api.get( EndPoints.samples("draw"));
            }
        };
    };
}



export const getSample = (sampleId) => {
    return (dispatch) => {
        return {
            type: GET_SAMPLE,
            payload: () => {
                return Api.get( EndPoints.samples(sampleId));
            }
        };
    };
}