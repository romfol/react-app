import React from 'react';
import './styles.css';

export const Pagination = props => {
  const { pagination, pagesAmount, activePage } = props;

  return pagesAmount > 1 ? (
    <div className="Container-List">
      {[...Array(pagesAmount)].map((x, i) => (
        <button
          className={`Pagination-button ${activePage === i + 1 ? 'active' : ''}`}
          key={i}
          id={i + 1}
          onClick={e => pagination(+e.target.id)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  ) : null;
};
