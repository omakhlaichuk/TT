import React from 'react';
import { connect } from 'react-redux';

import styles from './../css/RoundOverview.module.css';
import { calcFedCottages } from './Buildings/scoring';
import {
    changePhaseTo,
    clearSelection,
    changeMessage,
    feedCottages,
    newGame,
} from '../actions';
import {
    message,
    FEEDING_PHASE,
    SCORING_PHASE,
    GAME_PHASE
} from './constants';

const RoundOverview = props => {
    const nextRound = (props) => {
        switch (props.phase) {

            case GAME_PHASE:
                props.changePhaseTo(FEEDING_PHASE);
                props.clearSelection();
                const fedCottages = calcFedCottages(props.board, props.buildings);
                props.feedCottages(fedCottages);
                props.changeMessage(message.goToFeedingPhase(fedCottages));
                break;

            case FEEDING_PHASE:
                props.changePhaseTo(SCORING_PHASE);
                props.changeMessage(message.goToGamePhase);
                break;

            case SCORING_PHASE:
                props.changePhaseTo(GAME_PHASE);
                props.newGame();
                break;

            default:
                props.changeMessage('зачем нажимать? - нужно лочить кнопку!!!');
        }
    };


    return (
        <div className={styles.roundOverview} >
            <button onClick={() => nextRound(props)}>
                {message.changePhaseBtn(props.phase)}
            </button>
            <h4> Round Overview </h4>
            <p className={props.selectedPawnType ? "" : styles.currentUserAction} >1. Chose to place any 1 of 3 available resources.</p>
            <p className={props.selectedPawnType === "RESOURCE" ? styles.currentUserAction : ""}>2. Place selected resource in an empty square.</p>
            <p className={props.selectedPawnType ? "" : styles.currentUserAction}>3. You may select squares for pattern checking if it has match buildings shape. </p>
            <p className={props.selectedPawnType >= 0 ? styles.currentUserAction : ""}>4. Construct the building in case of matching. </p>

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
    }
};

export default connect(mapStateToProps, {
    changePhaseTo,
    clearSelection,
    changeMessage,
    feedCottages,
    newGame,
})(RoundOverview);

