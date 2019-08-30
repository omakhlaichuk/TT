import React from 'react';

import ToolbarWithResources from './ToolbarWithResources';
import Board from './Board';
import BuildingsSet from './Buildings/BuildingsSet';
import styles from  './../css/App.module.css';
import '../css/index.css';

const App = () => {
  return (
    <div>
      <h3>Tiny Towns</h3>
      <div id="toolbarBoard" className={styles.flexRow}>
        <ToolbarWithResources />
        <Board />
      </div>
      <BuildingsSet />
    </div>
  );
}

export default App;
