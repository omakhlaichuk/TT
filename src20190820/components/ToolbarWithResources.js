import React from 'react';
import { connect } from 'react-redux';


import Resource from './Resource';
import { changePhaseTo, placeResource, clearSelection, changeMessage, placeBuilding, feedCottages, newGame } from '../actions';
import { calcFedCottages } from './Buildings/scoring';
import {
    message,
    RESOURCE,
    FEEDING_PHASE,
    EMPTY_SQUARE,
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
            props.clearSelection();
            props.changeMessage("Переходим к кормежке?");
            props.feedCottages(
                calcFedCottages(props.board, props.buildings)
            );
            props.changePhaseTo(FEEDING_PHASE);
            break;

        case FEEDING_PHASE:
            props.changePhaseTo(SCORING_PHASE);
            props.changeMessage("Переходим к подсчету очков?");
            break;

        case SCORING_PHASE:
            props.changePhaseTo(GAME_PHASE);
            props.changeMessage("начинаем новую игру");
            props.newGame();
            break;

        default:
            props.changeMessage('зачем нажимать? - нужно лочить кнопку!!!');
    }
};

const renderButtons = props => {
    //if board is full
    if (!props.board.indexes.find(i => props.board[i] === EMPTY_SQUARE)) {
        return <button onClick={() => nextRound(props)}>NEXT</button>;
    }

    if (props.selectedSquare) {
        if (props.selectedPawn.type === RESOURCE) {
            return <button onClick={() => placeSelectedResource(props)}> PLACE RESOURCE</button>;
        } else if (props.selectedPawn.type >= 0) {
            return <button onClick={() => placeSelectedBuilding(props)}> PLACE BUILDING</button>;
        }
    }
}

const ToolbarWithResources = props => {

    return (
        <div className="resourceSelector">
            Resources
            <Resource id={0} />
            <Resource id={1} />
            <Resource id={2} />
            {props.message} <br />
            {renderButtons(props)}
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
        message: state.message
    }
};

export default connect(mapStateToProps, { changePhaseTo, placeResource, clearSelection, changeMessage, placeBuilding, feedCottages, newGame })(ToolbarWithResources);