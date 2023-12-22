import React, { useEffect } from 'react';
import "/src/style.css";

const Alert = ({ message }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>{message}</p>
        </div>
      </div>
    );
  };
  
  export default Alert;
  
