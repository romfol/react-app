import React, { Component } from 'react';
import { ShowingAndSortingButtons } from '../showing-sortingButtons/showing-sortingButtons';
import List from '../list/list';
import { CheckingButtons } from '../checkingButtons/checkingButtons';
import Pagination from '../pagination/pagination';

import './styles.css';

class App extends Component {
  state = {
    value: '',
    tasks: [],
    showFiltered: false,
    edgeItems: { indexFirstTask: 0, indexLastTask: 9 },
  };

  setEdgeTasksToShow = currentPage => {
    const tasksPerPage = 10;
    const indexDifferFromFirstToLast = 9;
    const indexLastTask = currentPage * tasksPerPage - 1;
    const indexFirstTask = indexLastTask - indexDifferFromFirstToLast;
    this.setState({ edgeItems: { indexFirstTask, indexLastTask } });
  };

  sortByDate = () => {
    const sortedTasks = [...this.state.tasks];
    sortedTasks.sort((a, b) => a.timeId - b.timeId);
    this.setState({ tasks: sortedTasks });
  };

  sortByTitle = () => {
    const sortedTasks = [...this.state.tasks];
    sortedTasks.sort((a, b) => {
      let taskA = a.task.toUpperCase();
      var taskB = b.task.toUpperCase();
      if (taskA < taskB) {
        return -1;
      }
      if (taskA > taskB) {
        return 1;
      }
      return 0;
    });
    this.setState({ tasks: sortedTasks });
  };

  showAll = () => {
    this.setState({ showFiltered: false });
  };

  showActive = () => {
    const activeTasks = this.state.tasks.filter(task => !task.isDone);
    this.setState({ showFiltered: true, filteredTasks: activeTasks });
  };

  showCompleted = () => {
    const completedTasks = this.state.tasks.filter(task => task.isDone);
    this.setState({ showFiltered: true, filteredTasks: completedTasks });
  };

  markChecked = (id, e) => {
    this.state.tasks.forEach((task, i) => {
      if (task.timeId === id) {
        const markedTask = this.state.tasks.slice();
        markedTask[i].isChecked = e.target.checked;
        this.setState({ tasks: markedTask });
      }
    });
  };

  deleteChecked = () => {
    const newTasks = this.state.tasks.filter(task => !task.isChecked);
    this.setState({
      tasks: newTasks,
    });
  };

  uncheckAll = () => {
    const uncheckedAll = [...this.state.tasks];
    uncheckedAll.forEach((item, i) => {
      uncheckedAll[i].isChecked = false;
    });
    this.setState({ tasks: uncheckedAll });
  };

  checkAll = () => {
    const checkedAll = [...this.state.tasks];
    checkedAll.forEach((item, i) => {
      checkedAll[i].isChecked = true;
    });
    this.setState({ tasks: checkedAll });
  };

  submitChangeTask = (newTask, id) => {
    this.state.tasks.forEach((task, i) => {
      if (task.timeId === id) {
        const newTasks = [...this.state.tasks];
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
        timeId: +new Date(),
        isDone: false,
        onEdit: false,
        isChecked: false,
      }),
      value: '',
    });
  };

  render() {
    return (
      <div className="App">
        <ShowingAndSortingButtons
          showAll={this.showAll}
          showActive={this.showActive}
          showCompleted={this.showCompleted}
          sortByDate={this.sortByDate}
          sortByTitle={this.sortByTitle}
        />
        <div>
          <h1 style={{ textAlign: 'center' }}>
            <span>TO-DO LIST</span>
          </h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Task..."
              value={this.state.value}
              onChange={this.handleChange}
              className="Input"
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
            edgeItems={this.state.edgeItems}
            tasks={this.state.tasks}
            showFiltered={this.state.showFiltered}
            filteredTasks={this.state.filteredTasks}
            removeTask={this.removeTask}
            markTask={this.markTask}
            onEdit={this.onEdit}
            submitChangeTask={this.submitChangeTask}
            cancelChangeTask={this.cancelChangeTask}
            markChecked={this.markChecked}
          />
          <Pagination tasks={this.state.tasks} setEdgeTasksToShow={this.setEdgeTasksToShow} />
        </div>
      </div>
    );
  }
}

export default App;
