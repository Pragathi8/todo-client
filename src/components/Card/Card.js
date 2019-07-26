import React, { Component } from 'react'
import {connect} from 'react-redux';

import filterValues from '../../constants/filterValues';
import {getTodos, toggleTodo, deleteTodo} from '../../actions/actions';
import './Card.css';

import Task from '../Task/Task';

class Card extends Component {

    render() {

        let todos = this.props.todos;;

        if(this.props.visibilityFilter===filterValues.SHOW_PENDING){
            todos = todos.filter(todo => !todo.completed)
        } else if(this.props.visibilityFilter===filterValues.SHOW_COMPLETED){
            todos = todos.filter(todo => todo.completed)
        }

        return (
            <div className="card todo my-4">
                <div className="card-header bg-dark text-light text-center">
                    ToDo..!!!
                </div>
                <ul className="list-group list-group-flush">
                    {
                        todos.length ?
                            todos.map(task =>
                                <Task key={task.id} task={task} visibilityFilter={this.props.visibilityFilter} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo} />
                            ) : <li className="list-group-item" style={{ color: 'red' }}>Nothing to Show..!!!</li>}
                </ul>
            </div>
        )
    }

    componentDidMount() {
        this.props.getTodos();
    }
}
const mapStateToProps = state => ({
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
})

export default connect(mapStateToProps, {getTodos, toggleTodo, deleteTodo})(Card);
