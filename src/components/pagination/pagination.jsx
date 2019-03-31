import React, { Component } from 'react';
import './styles.css';

class Pagination extends Component {
  handleClick = e => {
    this.props.pagination(+e.target.id);
  };

  render() {
    const { filteredAndSorted, activePage } = this.props;

    return filteredAndSorted.length > 10 ? (
      <div className="Container-List">
        {[...Array(Math.ceil(filteredAndSorted.length / 10))].map((x, i) => (
          <button
            className={`Pagination-button ${activePage === i + 1 ? 'active' : ''}`}
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
