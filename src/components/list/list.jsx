import React, { Component } from 'react';
import { Spinner } from '../spinner/spinner';
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

  render() {
    const {
      loaded,
      edgeItems: { indexFirstTask, indexLastTask },
      filteredItems,
      notOnEdit,
      onEditItem,
      isChecked,
      markChecked,
      markTask,
      submitChangeTask,
      removeTask,
    } = this.props;

    if (!loaded) return <Spinner />;

    return filteredItems.length ? (
      <ul className="List">
        {filteredItems.slice(indexFirstTask, indexLastTask + 1).map(task => {
          const { timeId, isDone } = task;
          if (timeId === onEditItem) {
            return (
              <li className="tasks" key={timeId} onMouseLeave={notOnEdit}>
                <input
                  type="checkbox"
                  checked={isChecked.includes(timeId)}
                  onChange={e => markChecked(timeId, e)}
                />
                <input
                  type="text"
                  placeholder="New task..."
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <input type="checkbox" checked={isDone} onChange={e => markTask(timeId, e)} />
                <button
                  className="Edit-button"
                  onClick={() => submitChangeTask(this.state.value, timeId)}
                >
                  Save
                </button>
                <button className="Delete-button" onClick={notOnEdit}>
                  Cancel
                </button>
              </li>
            );
          } else if (this.state.hoverableItem === timeId) {
            return (
              <li className="tasks" key={timeId} onMouseLeave={this.hoverOff}>
                <input
                  type="checkbox"
                  checked={isChecked.includes(timeId)}
                  onChange={e => markChecked(timeId, e)}
                />
                <span className={isDone ? 'marked-title' : 'regular-title'}>{task.task}</span>
                <input type="checkbox" checked={isDone} onChange={e => markTask(timeId, e)} />
                <button className="Edit-button" onClick={() => this.editTitle(timeId, task.task)}>
                  Edit
                </button>
                <button className="Delete-button" onClick={() => removeTask(timeId)}>
                  Remove
                </button>
              </li>
            );
          } else
            return (
              <li className="tasks" key={timeId} onMouseEnter={() => this.hoverOn(timeId)}>
                <input
                  type="checkbox"
                  checked={isChecked.includes(timeId)}
                  onChange={e => markChecked(timeId, e)}
                />
                <span className={isDone ? 'marked-title wide' : 'regular-title wide'}>
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
