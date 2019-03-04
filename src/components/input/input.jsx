import React, { Component } from 'react';
import List from '../list/list';
import CheckingButtons from '../checkingButtons/checkingButtons';
import './styles.css';

class Input extends Component {
  state = { value: '', tasks: [] };

  deleteChecked = () => {
    const newTasks = this.state.tasks.filter(task => !task.isDone);
    this.setState({
      tasks: newTasks,
    });
  };

  uncheckAll = () => {
    const checkedAll = this.state.tasks.slice();
    checkedAll.forEach((item, i) => {
      checkedAll[i].isDone = false;
    });
    this.setState({ tasks: checkedAll });
  };

  checkAll = () => {
    const checkedAll = this.state.tasks.slice();
    checkedAll.forEach((item, i) => {
      checkedAll[i].isDone = true;
    });
    this.setState({ tasks: checkedAll });
  };

  submitChangeTask = (newTask, id) => {
    this.state.tasks.forEach((task, i) => {
      if (task.timeId === id) {
        const newTasks = this.state.tasks.slice();
        newTasks[i].task = newTask;
        newTasks[i].onEdit = !newTasks[i].onEdit;
        this.setState({ tasks: newTasks });
      }
    });
  };

  onEdit = id => {
    this.state.tasks.forEach((task, i) => {
      if (task.timeId === id) {
        const editingTasks = this.state.tasks.slice();
        editingTasks[i].onEdit = !editingTasks[i].onEdit;
        this.setState({ tasks: editingTasks });
      }
    });
  };

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
        onEdit: false,
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
        <CheckingButtons
          checkAll={this.checkAll}
          deleteChecked={this.deleteChecked}
          uncheckAll={this.uncheckAll}
        />
        <List
          tasks={this.state.tasks}
          removeTask={this.removeTask}
          markTask={this.markTask}
          onEdit={this.onEdit}
          submitChangeTask={this.submitChangeTask}
          cancelChangeTask={this.cancelChangeTask}
        />
      </div>
    );
  }
}

export default Input;
