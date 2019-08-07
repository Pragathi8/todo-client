import { ADD_TODO_URL, TOGGLE_TODO_URL, DELETE_TODO_URL, REGISTER_USER_URL, LOGIN_USER_URL, LOGOUT_USER_URL, GET_TODOS_URL } from './databaseRoutes';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, CHANGE_VISIBILITY_FILTER, LOGIN_USER, LOGOUT_USER, CLEAR_ERROR_MSG, CLEAR_TODOS, GET_TODOS, ERROR_AUTHENTICATING } from './types';

export const addTodo = (userId, task) => dispatch => {
    fetch(`${ADD_TODO_URL}/${userId}/addTodo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: task
        })
    })
        .then(resp => resp.json())
        .then(data => dispatch({
            type: ADD_TODO,
            payload: data
        }))
}

export const toggleTodo = (userId, id) => dispatch => {
    fetch(`${TOGGLE_TODO_URL}/${userId}/toggleTodo/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(resp => resp.json())
        .then(data => dispatch({
            type: TOGGLE_TODO,
            id: data.id
        }))
}

export const deleteTodo = (userId, id) => dispatch => {
    fetch(`${DELETE_TODO_URL}/${userId}/deleteTodo/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
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

export const registerUser = (emailId, password) => dispatch => {
    fetch(REGISTER_USER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailId: emailId,
            password: password
        })
    })
        .then(resp => {
            if (resp.ok) resp.json().then(data => {
                let date = new Date();
                date.setTime(date.getTime() + 5 * 60 * 1000)
                document.cookie = `username=${data.emailId};expires=${date.toUTCString()}`; //setting a user whenever he is logged in and expiry time
                dispatch({
                    type: LOGIN_USER,
                    payload: data
                })
            })
            else {
                resp.json().then(data => dispatch({
                    type: ERROR_AUTHENTICATING,
                    payload: {
                        errorMsg: data.errorMsg
                    }
                }))
            }
        })
}

export const login = (emailId, password) => dispatch => {
    fetch(LOGIN_USER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailId: emailId,
            password: password
        })
    })
        .then(resp => {
            if (resp.ok) resp.json().then(data => {
                localStorage.setItem('userId',emailId);
                dispatch({
                    type: LOGIN_USER,
                    payload: data
                })
            })
            else {
                resp.json().then(data => dispatch({
                    type: ERROR_AUTHENTICATING,
                    payload: {
                        errorMsg: data.errorMsg
                    }
                }))
            }
        })
}

export const logout = () => dispatch => {
    fetch(LOGOUT_USER_URL)
        // .then(resp => resp.json())
        .then(() => {
            localStorage.removeItem('userId');
            dispatch({
                type: LOGOUT_USER,
            })
        })
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

export const getTodos = (userId) => dispatch => {
    fetch(`${GET_TODOS_URL}/${userId}`)
        .then(resp => resp.json())
        .then(data => dispatch({
            type: GET_TODOS,
            payload: data
        }))
}

 