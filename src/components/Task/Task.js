import React, { Component } from 'react'

import './Task.css';

class Task extends Component {
    render() {
        let className = "list-group-item task";

        if(this.props.task.completed) className+=" completed"
        return (
            <li className={className} id={this.props.task.id}>
                <span className="text" onClick = {(e) => {
                    this.props.toggleTodo(e.target.parentElement.id);
                }}> {this.props.task.text}
                </span> <span className="delete" onClick = {(e) => {
                    this.props.deleteTodo(e.target.parentElement.id);
                }}>✁</span>
            </li>
        )
    }
}

export default Task
