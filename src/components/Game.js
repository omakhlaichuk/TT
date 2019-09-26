import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ToolbarWithResources from './ToolbarWithResources';
import Board from './Board';
import RoundOverview from './RoundOverview';
import BuildingsSet from './Buildings/BuildingsSet';
import styles from './../css/Game.module.css';


const Game = () => {
    return (
        <>
            <Row id="toolbarBoard" className={styles.flexRow}>
                <Col><Board /></Col>
                <Col><ToolbarWithResources /></Col>
                <Col><RoundOverview /></Col>
            </Row>
            <BuildingsSet />
        </>
    );
}

export default Game;