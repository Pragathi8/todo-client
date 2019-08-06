import React, { Component } from 'react';
import {connect} from 'react-redux';
import {toggleTodo, deleteTodo} from '../../actions/actions';

import './Task.css';

class Task extends Component {
    render() {
        let className = "list-group-item task";

        if(this.props.task.completed) className+=" completed"
        return (
            <li className={className} id={this.props.task.id}>
                <span className="text" onClick = {(e) => {
                    this.props.toggleTodo(this.props.user.emailId, e.target.parentElement.id);
                }} title="click to toggle"> {this.props.task.text}
                </span> <span className="delete" onClick = {(e) => {
                    this.props.deleteTodo(this.props.user.emailId, e.target.parentElement.id);
                }} title="click to delete">✁</span>
            </li>
        )
    }
}
const mapStateToProps = state => ({
    user: state.authInfo.user
})

export default connect(mapStateToProps, {toggleTodo, deleteTodo})(Task);
