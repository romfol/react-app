import React, { Component } from 'react';
import './styles.css';

class List extends Component {
  state = { value: '' };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { tasks } = this.props;

    return tasks.length ? (
      <ul>
        {tasks.map(task => {
          let markStyle = task.isDone ? 'marked' : '';
          // let editingStyle = task.onEdit ? 'onEdit' : '';
          if (task.onEdit) {
            return (
              <li className="tasks" key={task.timeId}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={e => this.props.markTask(task.timeId, e)}
                />
                <input
                  type="text"
                  placeholder="New task..."
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <button onClick={() => this.props.submitChangeTask(this.state.value, task.timeId)}>
                  Save
                </button>
                <button onClick={() => this.props.onEdit(task.timeId)}>Cancel</button>
              </li>
            );
          } else
            return (
              <li className="tasks" key={task.timeId}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={e => this.props.markTask(task.timeId, e)}
                />
                <span className={markStyle}>{task.task}</span>
                <button onClick={() => this.props.onEdit(task.timeId)}>Edit</button>
                <button onClick={() => this.props.removeTask(task.timeId)}>Remove</button>
              </li>
            );
        })}
      </ul>
    ) : (
      <h3 style={{ textAlign: 'center' }}>No tasks yet</h3>
    );
  }
}

export default List;
