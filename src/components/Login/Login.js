import React, { Component } from 'react'

class Login extends Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="login" />
                <input type="text" placeholder="password" />
                <input type="submit" value="Log In" />
            </form>
        )
    }
}

export default Login
