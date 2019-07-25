import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

export default (state = {
    user: {},
    errorMsg: '',
    isLoggedIn: false,
}, action) => {

    switch (action.type) {
        case LOGIN_USER:
            return action.payload.errorMsg ? {
                ...state,
                errorMsg: action.payload.errorMsg,
                isLoggedIn: false,
            } : {
                    ...state,
                    user: action.payload.user,
                    isLoggedIn: true
                }
        
        case LOGOUT_USER:
            return {
                user: {},
                errorMsg: '',
                isLoggedIn: false,
            }

        default:
            return state;
    }
}
