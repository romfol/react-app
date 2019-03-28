import React, { Component } from 'react';
import './styles.css';

class Pagination extends Component {
  handleClick = e => {
    this.props.setEdgeTasksToShow(e.target.id);
  };

  render() {
    const { filteredItems, activeButton } = this.props;

    return filteredItems.length > 10 ? (
      <div className="Container-List">
        {[...Array(Math.ceil(filteredItems.length / 10))].map((x, i) => (
          <button
            className={`Pagination-button ${activeButton === i + 1 ? 'active' : ''}`}
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
