import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, CLEAR_TODOS, GET_TODOS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case GET_TODOS:
            return action.payload;
        case ADD_TODO:
            return [...state,
                    action.payload
                ]
        case TOGGLE_TODO:
            return state.map((todo) => {
                    if (action.id === todo.id) return {
                        ...todo,
                        completed: !(todo.completed)
                    }
                    return todo;
                })
        case DELETE_TODO:
            return  state.filter(todo => todo.id !== action.id);
        case CLEAR_TODOS:
            return []
        default:
            return state;
    }
}