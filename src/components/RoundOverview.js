import React from 'react';
import { connect } from 'react-redux';

import styles from './../css/RoundOverview.module.css';

const RoundOverview = props => {

    return (
        <div className={styles.roundOverview} >
            <h4> Round Overview </h4>
            <p className={props.selectedPawnType ? "" : styles.currentUserAction} >1. Chose to place any 1 of 3 available resources.</p>
            <p className={props.selectedPawnType === "RESOURCE" ? styles.currentUserAction : ""}>2. Place selected resource in an empty square.</p>
            <p className={props.selectedPawnType ? "" : styles.currentUserAction}>3. You may select squares for pattern checking if it has match buildings shape. </p>
            <p className={props.selectedPawnType >= 0 && !props.selectedSquare ? styles.currentUserAction : ""}>4. Select the place for the building constraction. </p>
            <p className={props.selectedPawnType >= 0 && props.selectedSquare ? styles.currentUserAction : ""}>5. Confirm the building placement and resources removing.</p>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        selectedPawnType: state.selectedPawn.type,
        phase: state.phase,
        message: state.message,
        board: state.board,
        buildings: state.buildings,
        selectedSquare: state.selectedSquare,
    }
};

export default connect(mapStateToProps)(RoundOverview);

