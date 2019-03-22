import React, { Component } from 'react';
import { ShowingAndSortingButtons } from '../showing-sortingButtons/showing-sortingButtons';
import List from '../list/list';
import { CheckingButtons } from '../checkingButtons/checkingButtons';
import Pagination from '../pagination/pagination';

import './styles.css';

class App extends Component {
  state = {
    value: '',
    tasks: [
      {
        task: 'Buy horse',
        timeId: 1553171609032,
        isDone: false,
      },
      {
        task: 'Become markup developer',
        timeId: 1553171609040,
        isDone: true,
      },
      {
        task: 'Learn pixel perfect',
        timeId: 1553171609050,
        isDone: false,
      },
      {
        task: 'Master fluent English',
        timeId: 1553171609060,
        isDone: true,
      },
      {
        task: 'Run 40000 meters and not die',
        timeId: 1553171609070,
        isDone: false,
      },
      {
        task: 'Become React Jedy',
        timeId: 1553171609080,
        isDone: true,
      },
      {
        task: 'Take out garbage',
        timeId: 1553171609090,
        isDone: false,
      },
      {
        task: 'Play soccer',
        timeId: 1553171609100,
        isDone: true,
      },
      {
        task: 'Write message on Instagram',
        timeId: 1553171609110,
        isDone: false,
      },
      {
        task: 'Move tables',
        timeId: 1553171609120,
        isDone: true,
      },
      {
        task: 'Win on ping-pong ',
        timeId: 1553171609130,
        isDone: false,
      },
      {
        task: 'Jump over the rainbow',
        timeId: 1553171609140,
        isDone: false,
      },
      {
        task: 'Be ace',
        timeId: 1553171609150,
        isDone: true,
      },
      {
        task: 'Finish to-do list',
        timeId: 1553171609160,
        isDone: false,
      },
      {
        task: "Don't miss any lefted Champions League match",
        timeId: 1553171609170,
        isDone: true,
      },
    ],
    filteredItems: [],
    edgeItems: { indexFirstTask: 0, indexLastTask: 9 },
    onEdit: 0,
    isChecked: [],
    showActive: false,
    showCompleted: false,
    sortByTitle: false,
  };

  setEdgeTasksToShow = (currentPage = 1) => {
    const tasksPerPage = 10;
    const indexDifferFromFirstToLast = 9;
    const indexLastTask = currentPage * tasksPerPage - 1;
    const indexFirstTask = indexLastTask - indexDifferFromFirstToLast;
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
    const newFilteredTasks = [...this.state.filteredTasks].filter(task => !task.isChecked);
    const newTasks = [...this.state.tasks].filter(task => !task.isChecked);
    this.setState({
      tasks: newTasks,
      filteredTasks: newFilteredTasks,
    });
  };

  uncheckAll = () => {
    const { indexFirstTask, indexLastTask } = this.state.edgeItems;
    if (!this.state.showFiltered) {
      const uncheckedAll = [...this.state.tasks];

      uncheckedAll.forEach((item, i) => {
        if (i >= indexFirstTask && i <= indexLastTask) {
          uncheckedAll[i].isChecked = false;
        }
      });
      this.setState({ tasks: uncheckedAll });
    } else {
      const uncheckedAll = [...this.state.filteredTasks];
      uncheckedAll.forEach((item, i) => {
        if (i >= indexFirstTask && i <= indexLastTask) {
          uncheckedAll[i].isChecked = false;
        }
      });
      this.setState({ filteredTasks: uncheckedAll });
    }
  };

  checkAll = () => {
    const { indexFirstTask, indexLastTask } = this.state.edgeItems;

    const checkedAll = [...this.state.filteredItems];
    checkedAll.forEach((item, i) => {
      if (i >= indexFirstTask && i <= indexLastTask) {
        checkedAll[i].isChecked = true;
      }
    });
    this.setState({ filteredItems: checkedAll });
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

  showProcessedResult = () => {
    const allItems = [...this.state.tasks];

    let filteredItems = allItems;
    if (this.state.showActive) {
      filteredItems = allItems.filter(task => !task.isDone);
    } else if (this.state.showCompleted) {
      filteredItems = allItems.filter(task => task.isDone);
    }

    const sortedItems = filteredItems;
    if (this.state.sortByTitle) {
      sortedItems.sort((a, b) => {
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
    }
    this.setState({ filteredItems: sortedItems });
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
            timeId: +new Date(),
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
          showingAll={() =>
            this.setState({ showActive: false, showCompleted: false }, () =>
              this.showProcessedResult()
            )
          }
          showingActive={() =>
            this.setState({ showActive: true, showCompleted: false }, () =>
              this.showProcessedResult()
            )
          }
          showingCompleted={() =>
            this.setState({ showActive: false, showCompleted: true }, () =>
              this.showProcessedResult()
            )
          }
          dateSort={() => this.setState({ sortByTitle: false }, () => this.showProcessedResult())}
          titleSort={() => this.setState({ sortByTitle: true }, () => this.showProcessedResult())}
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
