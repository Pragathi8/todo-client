import React, { Component } from 'react'

import './Card.css';

import Task from '../Task/Task';

class Card extends Component {

    render() {

        let tasks = this.props.tasks;;

        if(this.props.visibilityFilter===this.props.filterValues.SHOW_PENDING){
            tasks = tasks.filter(task => !task.completed)
        } else if(this.props.visibilityFilter===this.props.filterValues.SHOW_COMPLETED){
            tasks = tasks.filter(task => task.completed)
        }

        return (
            <div className="card todo my-4">
                <div className="card-header bg-dark text-light text-center">
                    ToDo..!!!
                </div>
                <ul className="list-group list-group-flush">
                    {
                        tasks.length ?
                            tasks.map(task =>
                                <Task key={task.id} task={task} visibilityFilter={this.props.visibilityFilter} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo} />
                            ) : <li className="list-group-item" style={{ color: 'red' }}>Nothing to Show..!!!</li>}
                </ul>
            </div>
        )
    }
}

export default Card
