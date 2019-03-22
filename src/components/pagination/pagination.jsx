import React, { Component } from 'react';
import './styles.css';

class Pagination extends Component {
  state = {
    activeButton: 1,
  };

  handleClick = e => {
    const { id } = e.target;
    this.props.setEdgeTasksToShow(id);
    this.setState({ activeButton: +id });
  };

  render() {
    return this.props.filteredItems.length > 10 ? (
      <div className="Container-List">
        {[...Array(Math.ceil(this.props.filteredItems.length / 10))].map((x, i) => (
          <button
            className={`Pagination-button ${this.state.activeButton === i + 1 ? 'active' : ''}`}
            key={i}
            id={i + 1}
            onClick={this.handleClick}
          >
            {i + 1}
          </button>
        ))}
      </div>
    ) : null;
  }
}

export default Pagination;
