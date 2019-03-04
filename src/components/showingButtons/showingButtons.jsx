import React, { Component } from 'react';

import './styles.css';

class ShowingButtons extends Component {
  render() {
    return (
      <div className="Showing-Buttons">
        <h3>Show</h3>
        <ul className="List-Show-Buttons">
          <li>
            <button className="Showing-Button">All</button>
          </li>
          <li>
            <button className="Showing-Button">Active</button>
          </li>
          <li>
            <button className="Showing-Button">Completed</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default ShowingButtons;
