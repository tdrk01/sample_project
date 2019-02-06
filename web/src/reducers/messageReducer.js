import { SET_ERROR, SET_MESSAGE, CLEAR_MESSAGE } from "../constants/type";
import Immutable from 'immutable';

const initStatus = {
    messages: [],
    errors: [],
};

export default function messageReducer(state = initStatus, action = {}) {
    switch (action.type) {
    case SET_ERROR:
        return Immutable.fromJS(state)
            .updateIn(["errors"], v =>  {
                if(state.errors == null){
                    state.errors = [];
                }
                return state.errors.concat( [action.error] );
            })
            .toJS();

    case SET_MESSAGE:
        return Immutable.fromJS(state)
            .updateIn(["messages"], v =>  {
                if(state.messages == null){
                    state.messages = [];
                }
                return state.messages.concat( [action.message] );
            })
            .toJS();

    case CLEAR_MESSAGE:
        return initStatus;

    default:
        return state
    }
}