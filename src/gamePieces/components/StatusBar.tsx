// src/components/StatusBar.tsx

import React from 'react';
import '../styles/statusbar.css'

const StatusBar: React.FC = () => {
  return (
    <div className="status-bar">
      <div className="status-item">
        <span>Player Name: John Doe</span>
      </div>
      <div className="status-item">
        <span>Level: 3</span>
      </div>
      <div className="status-item">
        <span>Experience: 5000/10000</span>
      </div>
      <div className="status-item">
        <span>Turns: 5</span>
      </div>
      {/* Add other status information as needed */}
    </div>
  );
};

export default StatusBar;
