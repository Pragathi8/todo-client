import React, { Component } from 'react'

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

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    validateUser() {
        let user = this.props.users.find(user => this.state.username === user.username),
            errorMsg = '';

        if (user === undefined)
            errorMsg = "User doesn't exist..!!!";
        else if (user.password !== this.state.password)
            errorMsg = "Password is wrong.. Please check";
        else {
            this.props.userLogin(user);
        }

        this.setState({
            errorMsg: errorMsg
        })
    }

    signUpLink = () => {
        this.setState({
            existingUser: false,
            username: '',
            password: '',
            errorMsg: ''
        })
    }

    signUpHandler () {
        let {username,password,passwordDuplicate} = this.state,
            {users} = this.props,
            errorMsg = '',
            newUser = users.find(existingUser => existingUser.username===username);
        
        if(newUser !== undefined) {
            errorMsg = "Username already exists..!!!";
        } else if(password!==passwordDuplicate) {
            errorMsg = "Passwords doesn't match..!!!";
        } else {
            this.props.addUser({
                username,
                password
            })
            this.setState({
                existingUser: true,
                username: '',
                password: '',
                passwordDuplicate: '',
                errorMsg: ''
            })
        }
        this.setState({
            errorMsg
        })
    }

    render() {
        return (
            this.state.existingUser ? 
            <>
                <form className="loginForm">
                {this.state.errorMsg && <div className="errorMsg">{this.state.errorMsg}</div>}
                    <input className="loginText" type="text" name="username" placeholder="Enter your Username" value={this.state.username} onChange={this.changeHandler} /> <br />
                    <input className="loginText" type="password" name="password" placeholder="Enter your Password" value={this.state.password} onChange={this.changeHandler} /> <br />
                    <input type="button" className="btn btn-info loginButton" value="Log In" onClick={() => this.validateUser()} /> <br/>
                    <input type="button" className="btn btn-warning loginButton" value="New User? Create an Account" onClick={this.signUpLink}/>
                </form>
            </>
            : 
            <>
                <form className="loginForm">
                {this.state.errorMsg && <div className="errorMsg">{this.state.errorMsg}</div>}
                    <input className="loginText" type="text" name="username"  placeholder="Create a Username" value={this.state.username} onChange={this.changeHandler} /> <br />
                    <input className="loginText" type="password" name="password" placeholder="Create a Password" value={this.state.password} onChange={this.changeHandler}/> <br />
                    <input className="loginText" type="password" name="passwordDuplicate" placeholder="Re-Type your Password" value={this.state.passwordDuplicate} onChange={this.changeHandler}/> <br />
                    <input type="button" className="btn btn-warning loginButton" placeholder="Sign Up" value="Sign Up" onClick={() => this.signUpHandler()} />
                </form>
            </>
        )
    }
}

export default Login
