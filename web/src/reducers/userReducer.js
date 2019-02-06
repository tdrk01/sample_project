import { SET_USER } from "../constants/type";
import Immutable from 'immutable';

const initState = {
    user: {},
}

export default function userReducer(state = initState, action = {}) {
    switch (action.type) {
    case SET_USER:
        return Immutable.fromJS(state)
            .mergeIn( ["user"], action.data )
            .toJS();
    default:
        return state
    }
}