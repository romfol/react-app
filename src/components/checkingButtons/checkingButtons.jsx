import React from 'react';

import './styles.css';

export const CheckingButtons = props => {
  return (
    <div className="Checking-Buttons">
      <button className="Checking-Button" onClick={props.checkAll}>
        Check All
      </button>
      <button className="Checking-Button" onClick={props.uncheckAll}>
        Uncheck All
      </button>
      <button className="Checking-Button" onClick={props.deleteChecked}>
        Delete Selected
      </button>
    </div>
  );
};
