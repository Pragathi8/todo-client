import {combineReducers} from 'redux';

import todosReducer from './todosReducer';
import filterReducer from './filterReducer';
import authReducer from './authReducer';

export default combineReducers({
    todos: todosReducer,
    visibilityFilter: filterReducer,
    authInfo: authReducer
});