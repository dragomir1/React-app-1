import React, { Component } from 'react';
import uuid from 'uuid';


class AddProject extends Component {

constructor() {
  super();
  this.state = {
    newProject: {

    }
  }
}

  static defaultProps = {
    catatgories: ['web development', 'web design', "mobile Development"]
  }

  handleSubmit(e) {
    if(this.refs.title.value === '') {
      alert('title required');
    } else {
      this.setState({newProject: {
        id: uuid.v4(),
        title: this.refs.title.value,
        catagory: this.refs.catagory.value
      }}, function() {
        // console.log(this.state);
        this.props.addProject(this.state.newProject)
      });
    }
    e.preventDefault();
  }


  render() {
    let catagoryOptions = this.props.catatgories.map(catagory => {
      return <option key={catagory} value={catagory}>{catagory}</option>

    });

    return (
      <div>
        <h3>Add Projects</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" ref="title" />
          </div>
          <div>
            <label>Catagory</label><br />
            <select ref="catagory">
              {catagoryOptions}
            </select>
          </div>
            <br />
          <input type="submit" value="submit" />
            <br />
        </form>
      </div>

    );
  }
}

// AddProject.propTypes = {
//   catatgories : React.PropTypes.array,
//   addProject: React.PropTypes.func
// }

export default AddProject;
