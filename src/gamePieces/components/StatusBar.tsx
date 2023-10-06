// src/components/StatusBar.tsx

import React from 'react';
import '../styles/statusbar.css'
import { BattleProps } from './Battle';

function StatusBar (props: BattleProps) {

  const leader = props.leader;

  return (
    <div className="status-bar">
      <div className="status-item">
        <span>Leader: {leader.name}</span>
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
