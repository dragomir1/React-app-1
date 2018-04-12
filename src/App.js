import React, { Component } from 'react';
import uuid from 'uuid';
import $ from "jquery";
import Todos from './Components/Todos';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      todos: []
  }
}

getTodos() {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos',
    dataType: 'json',
    caceh: false,
    success: function(data) {
      this.setState({todos: data}, function() {
        console.log(this.state);
      });
    }.bind(this),
    error: function(xhr, status, err) {
      console.log(err);
    }
  });
}

getProjects() {
  this.setState({
    projects: [
      {
          id: uuid.v4(),
          title: "business website",
          catagory: "web desgisn"
      },
      {
        id: uuid.v4(),
        title: "social app",
        catagory: "mobile dev"

      },
      {
        id: uuid.v4(),
        title: "ecommerce",
        catagory: "web development"
      }
    ]
  });
}
// this is a lifecycle method.  When you set the state, you define and keep the keys in the Component. but the actual data goes in a lifecycle method. IT FIRES OFF EVERYTIME THE Component IS RE-RENDERED.

componentWillMount() {
  this.getProjects();
  this.getTodos();
}
componentDidMount() {
  this.getTodos();
}


handleAddProject(project) {
 let projects = this.state.projects;
 projects.push(project);
 this.setState({projects:projects});
}

handleDeleteProject(id) {
  let projects = this.state.projects;
  let index = projects.findIndex(x => x.id === id);
  projects.splice(index, 1);
 this.setState({projects:projects});
}

  render() {
    return (
      <div className="App">
      <AddProject addProject={this.handleAddProject.bind(this)}/>
      My Projects
      <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
      <hr />
      <Todos todos={this.state.todos} />


      </div>
    );
  }
}


export default App;
