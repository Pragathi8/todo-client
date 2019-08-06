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
                    console.log('clicked');
                    this.props.toggleTodo(this.props.user.emailId, e.target.parentElement.id);
                }}> {this.props.task.text}
                </span> <span className="delete" onClick = {(e) => {
                    this.props.deleteTodo(this.props.user.emailId, e.target.parentElement.id);
                }}>✁</span>
            </li>
        )
    }
}
const mapStateToProps = state => ({
    user: state.authInfo.user
})

export default connect(mapStateToProps, {toggleTodo, deleteTodo})(Task);
