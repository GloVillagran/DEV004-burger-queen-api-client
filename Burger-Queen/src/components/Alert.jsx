import React from 'react';
import './style.css/alert.css';

function Alert({ type, message }) {
  const icon = type === 'success' ? '✅' : '⚠️';
  const alertClass = `alert ${type}`;

  return (
    <div className={alertClass}>
      <span className="alert-icon">{icon}</span>
      <span className="alert-message">{message}</span>
    </div>
  );
}

export default Alert;
