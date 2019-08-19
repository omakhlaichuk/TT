import React from 'react';

import ToolbarWithResources from './ToolbarWithResources';
import Board from './Board';
import BuildingsSet from './Buildings/BuildingsSet';
import '../css/index.css';

const App = () => {
  return (
    <div>
      <h3>Tiny Towns</h3>
      <div className="flexRow">
        <ToolbarWithResources />
        <Board />
      </div>
      <BuildingsSet />
    </div>
  );
}

export default App;
