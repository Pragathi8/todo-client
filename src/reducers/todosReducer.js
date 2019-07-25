import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}