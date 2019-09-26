import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import InstantEffectFactory from './Buildings/InstantEffectFactory';
import { calcFedCottages } from './Buildings/scoring';
import Resource from './Resource';
import {
    changePhaseTo,
    placeResource,
    clearSelection,
    changeMessage,
    placeBuilding,
    scoreTotal,
    selectPawn,
    selectSquare,
    newGame,
    feedCottages,
} from '../actions';
import {
    message,
    RESOURCE,
    FEEDING_PHASE,
    SCORING_PHASE,
    GAME_PHASE
} from './constants';
import styles from './../css/ToolbarWithResources.module.css';

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

const placeSelectedResource = (placeResource, clearSelection, changeMessage) => {
    placeResource();
    clearSelection();
    changeMessage(message.showPattern);
};

let instantEffect = null;
const completeInstantEffect = () => {
    instantEffect = null
};
const placeSelectedBuilding = (selectedPawn, placeBuilding, changeMessage) => {
    //invoke the building instant effect if present
    if (selectedPawn.instantEffect) {
        placeBuilding();
        instantEffect = < InstantEffectFactory completeInstantEffect={completeInstantEffect} />;
    } else { placeBuilding(); };

    changeMessage(message.successfulBuildingPlacement);

}

//render button for the building/resource placing
const renderPlacingButtons = (selectedSquare, selectedPawn, placeResource, clearSelection, changeMessage, placeBuilding) => {
    if (selectedSquare && selectedPawn) {
        return <Button variant="outline-secondary" onClick={
            () => {
                if (selectedPawn.type === RESOURCE) { placeSelectedResource(placeResource, clearSelection, changeMessage) }
                if (selectedPawn.type >= 0) { placeSelectedBuilding(selectedPawn, placeBuilding, changeMessage) }
            }
        }> Place the {selectedPawn.title}</Button>;
        /*
                if (selectedPawn.type === RESOURCE) {
                    return <button onClick={() => placeSelectedResource(placeResource, clearSelection, changeMessage)}> Place the {selectedPawn.title} </button>;
                } else if (selectedPawn.type >= 0) {
                    return <button onClick={() => placeSelectedBuilding(selectedPawn, placeBuilding, changeMessage)}> Place the {selectedPawn.title}</button>;
                }*/
    }
}

//render button for the building unselect
const renderUnselectBuildingButton = (selectedPawn, unselectPawn, changeMessage, selectSquare) => {
    if (selectedPawn.type >= 0) {
        return <button onClick={() => {
            unselectPawn({});
            selectSquare(null);
            changeMessage(message.showPattern)
        }}> Unselect the {selectedPawn.title}</button>;
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
                <h4>Resources:</h4>
                <Resource id={0} />
                <Resource id={1} />
                <Resource id={2} />
            </>
        );
    }
}

const ToolbarWithResources = props => {

    return (
        <div className={styles.resourceSelector}>


            {renderResources(props.phase)}
            {totalScore(props)}
            <br/>
            <h4>You can:</h4>
            <p>{props.message} </p>
            {//render button for the building/resource placing
                renderPlacingButtons(props.selectedSquare, props.selectedPawn, props.placeResource, props.clearSelection, props.changeMessage, props.placeBuilding)}

            {//render instant effects after building placement
                instantEffect}

            {//render button for the building unselect
                renderUnselectBuildingButton(props.selectedPawn, props.selectPawn, props.changeMessage, props.selectSquare)
            }

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
        scoreTotal,
        selectPawn,
        selectSquare,
        newGame,
        feedCottages,
    })(ToolbarWithResources);

