import React, { Component } from 'react';
import { Provider } from 'react-redux';
import filterValues from '../../constants/filterValues';

import './App.css';

import store from '../../store';
import Routing from '../Routing/Routing';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      visibilityFilter: filterValues.SHOW_ALL,
      users: [],
      isLoggedIn: false,
      userId: "",
      username: ""
    }
  }

  render() {
    return (
      <Provider store = {store}>
        <Routing />
      </Provider>
    );
  }
}

export default App;


/*
* use this class methods while creating server
* Trying to keep visibility filter state for only client side
*/