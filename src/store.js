import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import filterValues from './constants/filterValues';
import rootReducer from './reducers/index';

const initialState = {
    todos: [],
    visibilityFilter: filterValues.SHOW_ALL,
    authInfo: {
        user: {},
        errorMsg: '',
        isLoggedIn: false,
    },
}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;
