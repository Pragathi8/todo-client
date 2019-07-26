import { ADD_TODO_URL, TOGGLE_TODO_URL, DELETE_TODO_URL, CHANGE_VISIBILITY_FILTER_URL, REGISTER_USER_URL, LOGIN_USER_URL, LOGOUT_USER_URL, GET_TODOS_URL } from './databaseRoutes';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, CHANGE_VISIBILITY_FILTER, LOGIN_USER, LOGOUT_USER, CLEAR_ERROR_MSG, CLEAR_TODOS, GET_TODOS } from './types';

export const addTodo = () => dispatch => {
    fetch(ADD_TODO_URL, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : {

        }
    })
    .then(resp => resp.json())
    .then(data => dispatch({
        type: ADD_TODO,
        payload: data
    }))
}

export const toggleTodo = () => dispatch => {
    fetch(TOGGLE_TODO_URL, {
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body : {

        }
    })
    .then(resp => resp.json())
    .then(data => dispatch({
        type: TOGGLE_TODO,
        id: data.id
    }))
}

export const deleteTodo = () => dispatch => {
    fetch(DELETE_TODO_URL, {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body : {

        }
    })
    .then(resp => resp.json())
    .then(data => dispatch({
        type: DELETE_TODO,
        id: data.id
    }))
}

export const changeFilter = (filter) => dispatch => {
    dispatch({
        type: CHANGE_VISIBILITY_FILTER,
        filter: filter
    })
}

export const registerUser = (username, password) => dispatch => {
    fetch(REGISTER_USER_URL)
    .then(resp => resp.json())
    .then(data => dispatch({
        type: LOGIN_USER,
        payload: data
    }))
}

export const login = (username, password) => dispatch => {
    fetch(LOGIN_USER_URL)
    .then(resp => resp.json())
    .then(data => dispatch({
        type: LOGIN_USER,
        payload: data
    }))
}

export const logout = () => dispatch => {
    fetch(LOGOUT_USER_URL)
    .then(resp => resp.json())
    .then(() => dispatch({
        type: LOGOUT_USER,
    }))
    .then(() => clearTodos());
}

export const clearErrorMsg = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR_MSG
    })
}

export const clearTodos = () => dispatch => {
    dispatch({
        type: CLEAR_TODOS
    })
}

export const getTodos = (id) => dispatch => {
    fetch(GET_TODOS_URL)
    .then(resp => resp.json())
    .then(data => dispatch({
        type: GET_TODOS,
        payload: data
    }))
}