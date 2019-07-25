import { ADD_TODO_URL, TOGGLE_TODO_URL, DELETE_TODO_URL, CHANGE_VISIBILITY_FILTER_URL } from './databaseRoutes';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, CHANGE_VISIBILITY_FILTER } from './types';

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

export const changeFilter = () => dispatch => {
    fetch(CHANGE_VISIBILITY_FILTER_URL)
    .then(resp => resp.json())
    .then(data => dispatch({
        type: CHANGE_VISIBILITY_FILTER,
        filter: data
    }))
}