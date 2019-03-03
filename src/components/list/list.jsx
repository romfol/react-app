import React, { Component } from 'react';
import './styles.css';

class List extends Component {
  render() {
    const { tasks } = this.props;

    return tasks.length ? (
      <ul>
        {tasks.map(task => {
          let markStyle = task.isDone ? 'marked' : 'not-marked';
          return (
            <li className="tasks" key={task.timeId}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={e => this.props.markTask(task.timeId, e)}
              />
              <span className={markStyle}>{task.task}</span>
              <button>Edit</button>
              <button onClick={() => this.props.removeTask(task.timeId)}>Remove</button>
            </li>
          );
        })}
      </ul>
    ) : (
      <h3>No tasks yet</h3>
    );
  }
}

export default List;
