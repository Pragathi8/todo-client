import React, { Component } from 'react'
import {connect} from 'react-redux';

import {logOut} from '../../actions/actions';
import Form from '../Form/form';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1" style={{color: "greenyellow"}}>{this.props.username}</span>
        <Form />
        <button className="btn btn-warning logoutButton" onClick={this.props.logOut}>Log Out</button>
      </nav>
    )
  }
}


const mapStateToProps = state => ({
  username: state.authInfo.username,
});

export default connect(mapStateToProps, {logOut})(Header);
