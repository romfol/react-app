import React, { Component } from 'react';
import { ShowingAndSortingButtons } from '../showing-sortingButtons/showing-sortingButtons';
import List from '../list/list';
import { CheckingButtons } from '../checkingButtons/checkingButtons';
import Pagination from '../pagination/pagination';
import templateList from '../../itemsList';
import { sortTasks, filterTasks } from '../../services';

import './styles.css';

class App extends Component {
  state = {
    value: '',
    tasks: templateList,
    items: [],
    filteredAndSorted: [],
    onEdit: 0,
    isChecked: [],
    showActive: false,
    showCompleted: false,
    sortByTitle: false,
    loaded: false,
    activePage: 1,
  };

  componentDidMount() {
    new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
      this.setState({ loaded: true });
      return this.showProcessedResult();
    });
  }

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
    const { tasks, isChecked, items } = this.state;

    const deletedIds = [];
    const checked = [];

    items.forEach(e => {
      if (isChecked.includes(e.timeId)) deletedIds.push(e.timeId);
    });
    const newTasks = tasks.filter(e => !deletedIds.includes(e.timeId));

    newTasks.forEach(item => {
      if (isChecked.includes(item.timeId)) {
        checked.push(item.timeId);
      }
    });

    this.setState(
      {
        tasks: newTasks,
        isChecked: checked,
      },
      () => this.showProcessedResult()
    );
  };

  uncheckAll = () => {
    const { items, isChecked } = this.state;
    const checked = [...isChecked];

    items.forEach((item, i) => {
      if (checked.includes(item.timeId)) {
        checked.splice(checked.indexOf(item.timeId), 1);
      }
    });
    this.setState({ isChecked: [...checked] });
  };

  checkAll = () => {
    const { isChecked, items } = this.state;

    const checkedItems = [];
    items.forEach((item, i) => {
      if (!isChecked.includes(item.timeId)) {
        checkedItems.push(items[i].timeId);
      }
    });
    this.setState({ isChecked: [...isChecked, ...checkedItems] });
  };

  submitChangeTask = (newTask, id) => {
    const { tasks } = this.state;
    tasks.forEach((task, i) => {
      if (task.timeId === id) {
        const newTasks = [...tasks];
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
    const { tasks, isChecked } = this.state;
    const checked = [...isChecked];

    const newList = tasks.filter(task => task.timeId !== id);
    if (checked.includes(id)) checked.splice(checked.indexOf(id), 1);

    this.setState(
      {
        tasks: newList,
        isChecked: checked,
      },
      () => this.showProcessedResult()
    );
  };

  markTask = (id, e) => {
    const { tasks } = this.state;
    tasks.forEach((task, i) => {
      if (task.timeId === id) {
        const markedTasks = [...tasks];
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

  pagination = activePage => {
    this.setState({ activePage }, () => this.showProcessedResult());
  };

  showProcessedResult = (currentPage = this.state.activePage) => {
    const { showActive, showCompleted, sortByTitle, tasks, activePage } = this.state;
    const allItems = [...tasks];

    const filteredAndSorted = sortTasks(
      filterTasks(allItems, showActive, showCompleted),
      sortByTitle
    );
    this.setState({ filteredAndSorted });

    const pagination = (allItems, currentPage) => {
      const tasksPerPage = 10;
      const differIndexFromFirstToLast = 9;
      const indexLastTask = currentPage * tasksPerPage - 1;
      const indexFirstTask = indexLastTask - differIndexFromFirstToLast;

      const filledPages = Math.ceil(filteredAndSorted.length / 10);
      if (activePage > filledPages) {
        this.setState({ activePage: filledPages }, () => this.showProcessedResult());
      }

      return allItems.filter((e, i) => indexFirstTask <= i && i <= indexLastTask);
    };

    const result = pagination(filteredAndSorted, currentPage);

    this.setState({ items: result });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = e => {
    const { tasks, value } = this.state;
    e.preventDefault();

    this.setState(
      {
        tasks: [
          ...tasks,
          {
            task: value,
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
            loaded={this.state.loaded}
            showProcessedResult={this.showProcessedResult}
            isChecked={this.state.isChecked}
            notOnEdit={this.notOnEdit}
            onEditItem={this.state.onEdit}
            edgeItems={this.state.edgeItems}
            items={this.state.items}
            removeTask={this.removeTask}
            markTask={this.markTask}
            onEdit={this.onEdit}
            submitChangeTask={this.submitChangeTask}
            markChecked={this.markChecked}
          />
          <Pagination
            activePage={this.state.activePage}
            pagination={this.pagination}
            filteredAndSorted={this.state.filteredAndSorted}
          />
        </div>
      </div>
    );
  }
}

export default App;
