import { SET_CREDITDATA } from "../constants/type";
import Immutable from 'immutable';

export default function cardReducer(state = {}, action = {}) {
    switch (action.type) {
    case SET_CREDITDATA:
        return action.data;
    default:
        return state
    }
}