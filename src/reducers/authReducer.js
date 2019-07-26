import { LOGIN_USER, LOGOUT_USER, CLEAR_ERROR_MSG } from "../actions/types";

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
            } : {
                    ...state,
                    user: action.payload.user,
                    errorMsg: '',
                    isLoggedIn: true
                }
        
        case LOGOUT_USER:
            return {
                ...state,
                user: {},
                isLoggedIn: false,
            }
        
        case CLEAR_ERROR_MSG:
            return {
                ...state,
                errorMsg: ''
            }
        default:
            return state;
    }
}
