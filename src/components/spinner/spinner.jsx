import React from 'react';
import './styles.css';

export const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <section className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </section>
      <p>just a moment...</p>
    </div>
  );
};
