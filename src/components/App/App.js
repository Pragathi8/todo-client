import React, { Component } from 'react';
import uuid from 'uuid';

import './App.css';

import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import Card from '../Card/Card';

class App extends Component {
  constructor(props) {
    super(props)
    this.url = "http://localhost:3001";
    this.filterValues = {
      SHOW_ALL: "SHOW_ALL",
      SHOW_COMPLETED: "SHOW_COMPLETED",
      SHOW_PENDING: "SHOW_PENDING",
    }
    this.state = {
      tasks: [],
      visibilityFilter: this.filterValues.SHOW_ALL,
    }
  }

  addTodo = (text) => {

    let newTask = {
      id: uuid.v4(),
      text: text,
      completed: false
    },
      fetchData = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(newTask), // body data type must match "Content-Type" header
      };

    fetch(`${this.url}/tasks`,fetchData)
    .then(resp =>   this.setState(prevState => {
      return {
        tasks: [
          ...prevState.tasks,
          newTask
        ]
      }
    }))
  }

  toggleTodo = (id) => {

    fetch(`${this.url}/tasks/${id}`)
    .then(resp => resp.json())
    .then(data => {
      fetch(`${this.url}/tasks/${id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed : !data.completed,
      }),

      })
      .then(resp =>  this.setState(prevState => {
        return {
          tasks: prevState.tasks.map(task => {
            if (task.id === id) {
              task.completed = !task.completed;
            }
            return task;
          })
        }
      }) )
    })
   
  }

  deleteTodo = (id) => {

    fetch(`${this.url}/tasks/${id}`,{
      method: "DELETE",
    })
    .then(resp => this.setState(prevState => {
      return {
        tasks: prevState.tasks.filter(task => {
          return !(task.id === id)
        })
      }
    }))
  }

  changeFilter = (filter) => {
    fetch(`${this.url}/visibilityFilter`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({
        value: filter
      })
    })
    .then(resp => this.setState({
      visibilityFilter: filter
    }))
  }

  componentDidMount() {
    fetch(`${this.url}/tasks`)
      .then(resp => resp.json())
      .then(data => this.setState({
        tasks: data
      }));
  }

  render() {
    return (
      <div className="App">
        <Header addTodo={this.addTodo} />
        <Filter changeFilter = {this.changeFilter} filterValues = {this.filterValues}/>
        <Card tasks={this.state.tasks} visibilityFilter={this.state.visibilityFilter} filterValues={this.filterValues} toggleTodo={this.toggleTodo} deleteTodo={this.deleteTodo}/>
      </div>
    );
  }
}

export default App;
