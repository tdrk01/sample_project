import { SET_TMPDATA, SET_AUTHDATA, CHECK_EMAIL, REGISTER, SET_REDIRECT } from "../constants/type";
import Immutable from 'immutable';

const initState = {
    tmp: {},
    login_date: null,
    auth_token: null,
    userId: null,
    redirectTo: null
};

export default function authReducer(state = initState, action = {}) {
    switch (action.type) {
    case SET_TMPDATA:
        return Immutable.fromJS(state)
            .updateIn( ["tmp"], v => action.data )
            .toJS();
    case SET_AUTHDATA:
        return Immutable.fromJS(state)
            .updateIn( ["userId"], v => action.userId )
            .updateIn( ["auth_token"], v => action.token )
            .updateIn( ["login_date"], v => {
                return action.token != null ? (new Date()) : null;
            })
            .toJS();
    case SET_REDIRECT:
        return Immutable.fromJS(state)
            .updateIn( ["redirectTo"], v => action.redirectTo )
            .toJS();
    default:
        return state
    }
}