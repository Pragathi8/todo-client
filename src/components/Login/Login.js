import React, { Component } from 'react'
import {connect} from 'react-redux';

import {login, clearErrorMsg, registerUser} from '../../actions/actions';

import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            existingUser: true,
            username: '',
            password: '',
            passwordDuplicate: '',
            errorMsg: '',
        }
    }

    /*
    * setting form values into state variables
    */
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

     /*
    * form validation is being done
    * reducing redundancy
    */
    validateForm(object){
        let valid = true;
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                if(!element){
                    valid = false;
                    this.setState({
                        errorMsg : `${key} can't be empty`,
                    })
                    if(!valid) return valid;  
                }
            }
        }
        return valid;
    }

    /*
    * form validation is being done
    * errorMsg is being set incase of failure, which re-renders the component
    * Calls login method from actions.js, in case of success
    */
    validateUser() {
        if(this.validateForm({
            username: this.state.username,
            password: this.state.password
        })) this.props.login(this.state.username, this.state.password)
    }

    
    /*
    * changes state which re-renders the component and shows register form
    * Also calls method of actions.js which clears errorMsg from server side (incase user tries to login and then tries to register)
    */
    signUpLink = () => {
        this.setState({
            existingUser: false,
            username: '',
            password: '',
            errorMsg: ''
        }, () => {
            this.props.clearErrorMsg();
        });
    }
    /*
    * form validation is being done
    * errorMsg is being set incase of failure, which re-renders the component
    * Calls register method from actions.js, in case of success
    */
    signUpHandler () {
        if(this.validateForm({
            username: this.state.username,
            password: this.state.password,
            passwordDuplicate: this.state.passwordDuplicate
        })){
            if(this.state.password!==this.state.passwordDuplicate) {
                this.setState({
                    errorMsg: "Passwords doesn't match..!!!"
                })
            } else {
                this.props.registerUser(this.state.username, this.state.password);
                /* this.setState({
                *     existingUser: true,
                *    username: '',
                *    password: '',
                *     passwordDuplicate: '',
                *    errorMsg: ''
                *  })
                * Need this if values are being displayed after successfully logging in and out
                * Since we return to component, it renders a new component and this shouldn't be needed
                */             
            }
        }
    }

    render() {
        return (
            this.state.existingUser ? 
            <>
                <form className="loginForm">
                {!this.props.errorMsg && this.state.errorMsg && <div className="errorMsg">{this.state.errorMsg}</div>}
                {this.props.errorMsg && <div className="errorMsg">{this.props.errorMsg}</div>}
                    <input className="loginText" type="text" name="username" placeholder="Enter your Username" value={this.state.username} onChange={this.changeHandler} /> <br />
                    <input className="loginText" type="password" name="password" placeholder="Enter your Password" value={this.state.password} onChange={this.changeHandler} /> <br />
                    <input type="button" className="btn btn-info loginButton" value="Log In" onClick={() => this.validateUser()} /> <br/>
                    <input type="button" className="btn btn-warning loginButton" value="New User? Create an Account" onClick={this.signUpLink}/>
                </form>
            </>
            : 
            <>
                <form className="loginForm">
                {!this.props.errorMsg && this.state.errorMsg && <div className="errorMsg">{this.state.errorMsg}</div>}
                {this.props.errorMsg && <div className="errorMsg">{this.props.errorMsg}</div>}
                    <input className="loginText" type="text" name="username"  placeholder="Create a Username" value={this.state.username} onChange={this.changeHandler} /> <br />
                    <input className="loginText" type="password" name="password" placeholder="Create a Password" value={this.state.password} onChange={this.changeHandler}/> <br />
                    <input className="loginText" type="password" name="passwordDuplicate" placeholder="Re-Type your Password" value={this.state.passwordDuplicate} onChange={this.changeHandler}/> <br />
                    <input type="button" className="btn btn-warning loginButton" placeholder="Sign Up" value="Sign Up" onClick={() => this.signUpHandler()} />
                </form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    errorMsg: state.authInfo.errorMsg,
})

export default connect(mapStateToProps, {login, clearErrorMsg, registerUser})(Login);


/*
* errorMsg from props is coming from server after validation
* errorMsg from state is from client after form validation
* Remember to clear the error messages after successful attempt (respective to both client and server side)
*/