import React, { Component } from 'react'
import {connect} from 'react-redux';

import {addTodo} from '../../actions/actions';

class form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task : '',
        }
    }

    changeHandler = (e) => {
        this.setState({
            task : e.target.value,
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.addTodo(this.props.user.emailId, this.state.task);
        this.setState({
            task: '',
        })
    }

    render() {
        return (
            <form className="form-inline addTask">
                <input className="form-control mr-sm-2 task" type="search" placeholder="Log your task" value={this.state.task} aria-label="Log your task" onChange={this.changeHandler}/>
                <button className="btn btn-light btn-outline-success my-2 my-sm-0" type="submit" onClick = {this.submitHandler}>Add</button>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    user: state.authInfo.user
})
export default connect(mapStateToProps, {addTodo})(form);
