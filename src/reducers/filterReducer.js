import { CHANGE_VISIBILITY_FILTER } from "../actions/types";

export default (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case CHANGE_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}