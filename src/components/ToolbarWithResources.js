import React from 'react';
import { connect } from 'react-redux';

import InstantEffectFactory from './Buildings/InstantEffectFactory'
import Resource from './Resource';
import {
    changePhaseTo,
    placeResource,
    clearSelection,
    changeMessage,
    placeBuilding,
    scoreTotal
} from '../actions';
import {
    message,
    RESOURCE,
    SCORING_PHASE,
    GAME_PHASE
} from './constants';
import styles from  './../css/ToolbarWithResources.module.css';

const placeSelectedResource = props => {
    props.placeResource();
    props.clearSelection();
    props.changeMessage(message.showPattern);
};

let instantEffect = null;
const completeInstantEffect = () => {
    instantEffect = null
};
const placeSelectedBuilding = props => {
    //invoke the building instant effect if present
    if (props.selectedPawn.instantEffect) {
        props.placeBuilding();
        instantEffect = < InstantEffectFactory completeInstantEffect={completeInstantEffect} />;
    } else { props.placeBuilding(); };

    props.changeMessage(message.successfulBuildingPlacement);

}


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
        <div className={styles.resourceSelector}>
            {renderResources(props.phase)}
            {totalScore(props)}
            {props.message} <br />
            {renderPlacingButtons(props)}
            
            {//render instant effects after building placement
            instantEffect}
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
    })(ToolbarWithResources);