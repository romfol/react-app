import React, { Component } from 'react';
import { ShowingAndSortingButtons } from '../showing-sortingButtons/showing-sortingButtons';
import List from '../list/list';
import { CheckingButtons } from '../checkingButtons/checkingButtons';
import Pagination from '../pagination/pagination';
import items from '../../itemsList';

import './styles.css';

class App extends Component {
  state = {
    value: '',
    tasks: items,
    filteredItems: [],
    edgeItems: { indexFirstTask: 0, indexLastTask: 9 },
    onEdit: 0,
    isChecked: [],
    showActive: false,
    showCompleted: false,
    sortByTitle: false,
    loading: true,
  };

  componentDidMount() {
    //const delay = t => );
    new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
      this.setState({ loading: false });
      return this.showProcessedResult();
    });
  }

  componentDidUpdate() {
    const {
      filteredItems,
      edgeItems: { indexFirstTask },
    } = this.state;
    if (filteredItems.length && filteredItems.length - 1 < indexFirstTask) {
      this.setEdgeTasksToShow();
    }
  }

  setEdgeTasksToShow = (currentPage = 1) => {
    const tasksPerPage = 10;
    const differIndexFromFirstToLast = 9;
    const indexLastTask = currentPage * tasksPerPage - 1;
    const indexFirstTask = indexLastTask - differIndexFromFirstToLast;
    this.setState({ edgeItems: { indexFirstTask, indexLastTask } });
  };

  markChecked = id => {
    const checked = [...this.state.isChecked];
    if (!checked.includes(id)) {
      this.setState({ isChecked: [...checked, id] });
    } else {
      checked.splice(checked.indexOf(id), 1);
      this.setState({ isChecked: checked });
    }
  };

  deleteChecked = () => {
    const newTasks = [...this.state.tasks].filter(
      task => !this.state.isChecked.includes(task.timeId)
    );

    this.setState(
      {
        tasks: newTasks,
      },
      () => this.showProcessedResult()
    );
  };

  uncheckAll = () => {
    const { indexFirstTask, indexLastTask } = this.state.edgeItems;
    const checked = [...this.state.isChecked];

    this.state.filteredItems.forEach((item, i) => {
      if (i >= indexFirstTask && i <= indexLastTask && checked.includes(item.timeId)) {
        checked.splice(checked.indexOf(item.timeId), 1);
      }
    });
    this.setState({ isChecked: [...checked] });
  };

  checkAll = () => {
    const { indexFirstTask, indexLastTask } = this.state.edgeItems;
    const items = [...this.state.filteredItems];

    const checkedItems = [];
    items.forEach((item, i) => {
      if (
        i >= indexFirstTask &&
        i <= indexLastTask &&
        !this.state.isChecked.includes(item.timeId)
      ) {
        checkedItems.push(items[i].timeId);
      }
    });
    this.setState({ isChecked: [...this.state.isChecked, ...checkedItems] });
  };

  submitChangeTask = (newTask, id) => {
    this.state.tasks.forEach((task, i) => {
      if (task.timeId === id) {
        const newTasks = [...this.state.tasks];
        newTasks[i].task = newTask;
        this.setState({ tasks: newTasks, onEdit: 0 });
      }
    });
  };

  notOnEdit = () => {
    this.setState({
      onEdit: 0,
    });
  };

  onEdit = id => {
    this.setState({
      onEdit: id,
    });
  };

  removeTask = id => {
    const newList = this.state.tasks.filter(task => task.timeId !== id);
    this.setState(
      {
        tasks: newList,
      },
      () => this.showProcessedResult()
    );
  };

  markTask = (id, e) => {
    this.state.tasks.forEach((task, i) => {
      if (task.timeId === id) {
        const markedTasks = [...this.state.tasks];
        markedTasks[i].isDone = e.target.checked;
        this.setState({ tasks: markedTasks });
      }
    });
  };

  showingAll = () => {
    this.setState({ showActive: false, showCompleted: false }, () => this.showProcessedResult());
  };

  showingActive = () => {
    this.setState({ showActive: true, showCompleted: false }, () => this.showProcessedResult());
  };

  showingCompleted = () => {
    this.setState({ showActive: false, showCompleted: true }, () => this.showProcessedResult());
  };
  dateSort = () => {
    this.setState({ sortByTitle: false }, () => this.showProcessedResult());
  };

  titleSort = () => {
    this.setState({ sortByTitle: true }, () => this.showProcessedResult());
  };

  showProcessedResult = () => {
    const { showActive, showCompleted, sortByTitle, tasks } = this.state;
    const allItems = [...tasks];

    const result = sortTasks(filterTasks(allItems, showActive, showCompleted), sortByTitle);

    function filterTasks(allItems, showActive, showCompleted) {
      if (showActive) {
        return allItems.filter(task => !task.isDone);
      } else if (showCompleted) {
        return allItems.filter(task => task.isDone);
      } else return allItems;
    }

    function sortTasks(allItems, sortByTitle) {
      if (sortByTitle) {
        allItems.sort((a, b) => {
          const taskA = a.task.toUpperCase();
          const taskB = b.task.toUpperCase();
          if (taskA < taskB) {
            return -1;
          }
          if (taskA > taskB) {
            return 1;
          }
          return 0;
        });
        return allItems;
      } else return allItems;
    }

    this.setState({ filteredItems: result });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState(
      {
        tasks: [
          ...this.state.tasks,
          {
            task: this.state.value,
            timeId: Date.now(),
            isDone: false,
          },
        ],
        onEdit: null,
        isChecked: [],
        value: '',
      },
      () => this.showProcessedResult()
    );
  };

  render() {
    return (
      <div className="App">
        <ShowingAndSortingButtons
          showingAll={this.showingAll}
          showingActive={this.showingActive}
          showingCompleted={this.showingCompleted}
          dateSort={this.dateSort}
          titleSort={this.titleSort}
        />
        <div>
          <h1 className="Title">
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
            loading={this.state.loading}
            showProcessedResult={this.showProcessedResult}
            isChecked={this.state.isChecked}
            notOnEdit={this.notOnEdit}
            onEditItem={this.state.onEdit}
            setEdgeTasksToShow={this.setEdgeTasksToShow}
            edgeItems={this.state.edgeItems}
            filteredItems={this.state.filteredItems}
            removeTask={this.removeTask}
            markTask={this.markTask}
            onEdit={this.onEdit}
            submitChangeTask={this.submitChangeTask}
            cancelChangeTask={this.cancelChangeTask}
            markChecked={this.markChecked}
          />
          <Pagination
            setEdgeTasksToShow={this.setEdgeTasksToShow}
            filteredItems={this.state.filteredItems}
          />
        </div>
      </div>
    );
  }
}

export default App;
