import React, { Component } from 'react';
import List from '../list/list';
import './styles.css';

class Input extends Component {
  state = { value: '', tasks: [] };

  removeTask = id => {
    const newTasks = this.state.tasks.filter(task => task.timeId !== id);
    this.setState({
      tasks: newTasks,
    });
  };

  markTask = (id, e) => {
    this.state.tasks.forEach((task, i) => {
      if (task.timeId === id) {
        const markedTasks = this.state.tasks.slice();
        markedTasks[i].isDone = e.target.checked;
        this.setState({ tasks: markedTasks });
      }
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      tasks: this.state.tasks.concat({
        task: this.state.value,
        timeId: new Date().toLocaleTimeString(),
        isDone: false,
      }),
      value: '',
    });
  };

  render() {
    return (
      <div>
        <h1>TO-DO LIST</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Task..."
            value={this.state.value}
            onChange={this.handleChange}
            required
          />
          <button className="add-button" type="submit" value="Submit">
            ADD NEW TASK
          </button>
        </form>
        <List tasks={this.state.tasks} removeTask={this.removeTask} markTask={this.markTask} />
      </div>
    );
  }
}

export default Input;
