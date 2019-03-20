import React, { Component } from 'react';
import './styles.css';

class List extends Component {
  state = { value: '', hoverableItem: null };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  editTitle = (id, title) => {
    this.setState({
      value: title,
    });
    this.props.onEdit(id);
  };

  hoverOn = id => {
    this.setState({ hoverableItem: id });
  };

  hoverOff = () => {
    this.setState({ hoverableItem: null });
  };

  //Number.isInteger(this.props.tasks.length / 10)

  componentDidUpdate(prevProps) {
    const { tasks, setEdgeTasksToShow, showFiltered, filteredTasks, edgeItems } = this.props;

    if (tasks.length && tasks.length - 1 < edgeItems.indexFirstTask) {
      setEdgeTasksToShow();
    }

    if (
      showFiltered &&
      filteredTasks.length &&
      filteredTasks.length - 1 < edgeItems.indexFirstTask
    ) {
      setEdgeTasksToShow();
    }

    // if (this.props.tasks !== prevProps.tasks) {
    //   console.log('111', prevProps.filteredTasks, this.props.filteredTasks);
    //   //this.forceUpdate();
    // }
  }

  render() {
    const { indexFirstTask, indexLastTask } = this.props.edgeItems;
    const tasks = this.props.showFiltered ? this.props.filteredTasks : this.props.tasks;

    // console.log(this.props.edgeItems);
    // console.log(this.props);

    return tasks.length ? (
      <ul className="List">
        {tasks.slice(indexFirstTask, indexLastTask + 1).map(task => {
          if (task.onEdit) {
            return (
              <li
                className="tasks"
                key={task.timeId}
                onMouseLeave={() => this.props.onEdit(task.timeId)}
              >
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={e => this.props.markChecked(task.timeId, e)}
                />
                <input
                  type="text"
                  placeholder="New task..."
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={e => this.props.markTask(task.timeId, e)}
                />
                <button
                  className="Edit-button"
                  onClick={() => this.props.submitChangeTask(this.state.value, task.timeId)}
                >
                  Save
                </button>
                <button className="Delete-button" onClick={() => this.props.onEdit(task.timeId)}>
                  Cancel
                </button>
              </li>
            );
          } else if (this.state.hoverableItem === task.timeId) {
            return (
              <li className="tasks" key={task.timeId} onMouseLeave={this.hoverOff}>
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={e => this.props.markChecked(task.timeId, e)}
                />
                <span className={task.isDone ? 'marked-title' : 'regular-title'}>{task.task}</span>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={e => this.props.markTask(task.timeId, e)}
                />
                <button
                  className="Edit-button"
                  onClick={() => this.editTitle(task.timeId, task.task)}
                >
                  Edit
                </button>
                <button
                  className="Delete-button"
                  onClick={() => this.props.removeTask(task.timeId)}
                >
                  Remove
                </button>
              </li>
            );
          } else
            return (
              <li
                className="tasks"
                key={task.timeId}
                onMouseEnter={() => this.hoverOn(task.timeId)}
              >
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={e => this.props.markChecked(task.timeId, e)}
                />
                <span className={task.isDone ? 'marked-title wide' : 'regular-title wide'}>
                  {task.task}
                </span>
              </li>
            );
        })}
      </ul>
    ) : (
      <h3 className="NoTasksText">No tasks yet</h3>
    );
  }
}

export default List;
