import { SET_CODE } from "../constants/type";
import Immutable from 'immutable';

const initState = {
    data: null
};

export default function cardReducer(state = initState, action = {}) {
    switch (action.type) {
    case SET_CODE:
        return {
            data: action.data
        };
    default:
        return state
    }
}