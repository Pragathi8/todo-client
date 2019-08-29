import React, { Component } from 'react';
import {connect} from 'react-redux';
import {toggleTodo, deleteTodo} from '../../actions/actions';

import './Task.css';

class Task extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isLoading : false
        }
    }
    
    render() {
        let className = "list-group-item task";

        if(this.props.task.completed) className+=" completed"
        return (
            <li className={className} id={this.props.task.id}>
                <span className="text" onClick = {(e) => {
                    if(!e.target.parentElement.className.includes('completed')){
                        this.setState({
                            isLoading: true
                        })
                        this.props.toggleTodo(this.props.user.emailId, e.target.parentElement.id);
                    }
                }} title="click to toggle"> {this.props.task.text}
                </span>
                <span className="delete" onClick = {(e) => {
                     this.setState({
                        isLoading: true
                    })
                    this.props.deleteTodo(this.props.user.emailId, e.target.parentElement.id);
                }} title="click to delete">✁</span>
                {this.state.isLoading && <span className="loader"></span>} 
            </li>
        )
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            this.setState({
                isLoading: false
            })
        }
    }
}
const mapStateToProps = state => ({
    user: state.authInfo.user
})

export default connect(mapStateToProps, {toggleTodo, deleteTodo})(Task);
