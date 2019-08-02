import { LOGIN_USER, LOGOUT_USER, CLEAR_ERROR_MSG, ERROR_AUTHENTICATING } from "../actions/types";

export default (state = {
    user: {},
    errorMsg: '',
    isLoggedIn: false,
}, action) => {

    switch (action.type) {
        case LOGIN_USER:
            return {
                    ...state,
                    user: action.payload,
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
        case ERROR_AUTHENTICATING:
            return {
                    ...state,
                    errorMsg: action.payload.errorMsg,
            }
        default:
            return state;
    }
}
