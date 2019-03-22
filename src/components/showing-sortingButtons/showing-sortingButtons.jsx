import React from 'react';
import './styles.css';

export const ShowingAndSortingButtons = props => {
  return (
    <div className="Showing-Buttons">
      <h3>Show</h3>
      <ul className="List-Show-Buttons">
        <li>
          <button className="Showing-Button" onClick={props.showingAll}>
            All
          </button>
        </li>
        <li>
          <button className="Showing-Button" onClick={props.showingActive}>
            Active
          </button>
        </li>
        <li>
          <button className="Showing-Button" onClick={props.showingCompleted}>
            Completed
          </button>
        </li>
      </ul>
      <h3>Sort by</h3>
      <ul className="List-Sort-Buttons">
        <li>
          <button className="Sort-Button" onClick={props.sortByDate}>
            Original order
          </button>
        </li>
        <li>
          <button className="Sort-Button" onClick={props.sortByTitle}>
            Title
          </button>
        </li>
      </ul>
    </div>
  );
};
