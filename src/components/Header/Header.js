import React, { Component } from 'react'

import Form from '../Form/form';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Todo</span>
        <Form addTodo={this.props.addTodo}/>
      </nav>
    )
  }
}

export default Header
