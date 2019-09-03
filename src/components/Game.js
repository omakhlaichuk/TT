import React from 'react';

import ToolbarWithResources from './ToolbarWithResources';
import Board from './Board';
import RoundOverview from './RoundOverview';
import BuildingsSet from './Buildings/BuildingsSet';
import styles from './../css/Game.module.css';


const Game = () => {
    return (
        <div>
            <div id="toolbarBoard" className={styles.flexRow}>
                <ToolbarWithResources />
                <Board />
                <RoundOverview />
            </div>
            <BuildingsSet />
        </div>
    );
}

export default Game;