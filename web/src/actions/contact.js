import { POST_CONTACT } from "../constants/type";
import Api from "../utils/api";
import { EndPoints } from "../constants/endpoints";


export const sendContact = (data) => {
    return (dispatch) => {
        return {
            type: POST_CONTACT,
            payload: () => {
                return Api.post( EndPoints.contacts(), data );
            }
        };
    };
}
