import React, { Component } from 'react';

import './styles.css';

class CheckingButtons extends Component {
  render() {
    return (
      <div className="Checking-Buttons">
        <button onClick={() => this.props.checkAll()}>Check All</button>
        <button onClick={() => this.props.uncheckAll()}>Uncheck All</button>
        <button onClick={() => this.props.deleteChecked()}>Delete Selected</button>
      </div>
    );
  }
}

export default CheckingButtons;
