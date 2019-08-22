import React from 'react';
import { connect } from 'react-redux';


import Resource from './Resource';
import {
    changePhaseTo,
    placeResource,
    clearSelection,
    changeMessage,
    placeBuilding,
    feedCottages,
    newGame,
    scoreTotal
} from '../actions';
import { calcFedCottages } from './Buildings/scoring';
import {
    message,
    RESOURCE,
    FEEDING_PHASE,
    SCORING_PHASE,
    GAME_PHASE
} from './constants';
import '../css/resources.css';


const placeSelectedResource = props => {
    props.placeResource();
    props.clearSelection();
    props.changeMessage(message.showPattern);
};

const placeSelectedBuilding = props => {
    props.placeBuilding();
    props.changeMessage(message.successfulBuildingPlacement);
}

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

const renderPlacingButtons = props => {
    if (props.selectedSquare) {
        if (props.selectedPawn.type === RESOURCE) {
            return <button onClick={() => placeSelectedResource(props)}> PLACE RESOURCE</button>;
        } else if (props.selectedPawn.type >= 0) {
            return <button onClick={() => placeSelectedBuilding(props)}> PLACE BUILDING</button>;
        }
    }
}

const totalScore = props => {
    if (props.phase === SCORING_PHASE) {
        let scoring = 0;
        props.buildings.forEach(building => {
            if (building.score) { scoring += building.score };
        });

        props.board.indexes.forEach(index => {
            if (!(props.board[index].type >= 0)) {
                scoring--;
            }
        })
        props.scoreTotal(scoring);

        return <p>Total score: {props.score}  </p>;
    };
}

const renderResources = phase => {
    if (phase === GAME_PHASE) {
        return (
            <>
                Available resources:
                <Resource id={0} />
                <Resource id={1} />
                <Resource id={2} />
            </>
        );
    }
}

const ToolbarWithResources = props => {


    return (
        <div className="resourceSelector">
            {renderResources(props.phase)}
            {totalScore(props)}
            {props.message} <br />
            {renderPlacingButtons(props)}
            <button onClick={() => nextRound(props)}>
            {message.changePhaseBtn(props.phase)}
            </button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        selectedPawn: state.selectedPawn,
        selectedSquare: state.selectedSquare,
        phase: state.phase,
        board: state.board,
        buildings: state.buildings,
        message: state.message,
        score: state.score,
    }
};

export default connect(mapStateToProps,
    {
        changePhaseTo,
        placeResource,
        clearSelection,
        changeMessage,
        placeBuilding,
        feedCottages,
        newGame,
        scoreTotal
    })(ToolbarWithResources);