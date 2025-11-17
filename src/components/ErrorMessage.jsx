import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;