import React from 'react';
import './styles.css';

export const Spinner = () => {
  return (
    <section className="spinner-wrapper">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </section>
  );
};
