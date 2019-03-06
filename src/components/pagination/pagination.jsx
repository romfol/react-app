import React, { Component } from 'react';
import './styles.css';

class Pagination extends Component {
  handleClick = e => {
    this.props.setEdgeTasksToShow(e.target.id);
  };

  render() {
    const { tasks } = this.props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(tasks.length / 10); i++) {
      pageNumbers.push(i);
    }

    if (tasks.length > 10) {
      return (
        <div style={{ textAlign: 'center' }}>
          {pageNumbers.map(number => {
            return (
              <button
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                  padding: '8px 16px',
                  margin: '4px',
                }}
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </button>
            );
          })}
        </div>
      );
    } else return null;
  }
}

export default Pagination;
