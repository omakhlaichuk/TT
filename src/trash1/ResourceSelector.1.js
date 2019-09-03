import React from 'react';
import { connect } from 'react-redux';


import Resource from '../components/Resource';
import { changePhaseTo, placeResource, clearSelection, changeMessage, placeBuilding, feedCottages, newGame } from '../actions';
import { calcFedCottages } from '../components/Buildings/scoring';
import {
    message,
    RESOURCE_PHASE,
    BUILDING_PHASE,
    FEEDING_PHASE,
    EMPTY_SQUARE,
    SCORING_PHASE
} from '../components/constants';
import '../css/resources.css';


const placeSelectedResource = props => {
    props.placeResource();
    props.clearSelection();
    props.changePhaseTo(BUILDING_PHASE);
    props.changeMessage(message.showPattern);
};

const placeSelectedBuilding = props => {
    props.placeBuilding();
    props.changeMessage(message.successfulBuildingPlacement);
}

const nextRound = (props) => {
    switch (props.phase) {

        case BUILDING_PHASE:
            props.clearSelection();
            //check is it empty squares
            if (props.board.indexes.find(i => props.board[i] === EMPTY_SQUARE)) {
                props.changePhaseTo(RESOURCE_PHASE);
                //   this.props.changeMessage(message.selectResource);
            } else {
                props.changeMessage("Переходим к кормежке?");
                props.feedCottages(
                    calcFedCottages(props.board, props.buildings)
                );
                props.changePhaseTo(FEEDING_PHASE);
            }
            break;

        case FEEDING_PHASE:
            props.changePhaseTo(SCORING_PHASE);
            props.changeMessage("Переходим к подсчету очков?");
            break;

        case SCORING_PHASE:
            props.changePhaseTo(BUILDING_PHASE);
            props.changeMessage("начинаем новую игру");
            props.newGame();
            break;

        default:
            props.changeMessage('зачем нажимать? - нужно лочить кнопку!!!');
    }
};

const renderActionHelper = props => {
    if (props.phase === RESOURCE_PHASE) {
        if (!props.selectedPawn.type && !props.selectedSquare) {
            props.changeMessage(message.selectResourceAndPlace);
        } else if (!props.selectedPawn.type) {
            props.changeMessage(message.selectResource);

        } else if (!props.selectedSquare) {
            props.changeMessage(message.placeResource(props.selectedPawn.title.toLowerCase()));
        } else {
            props.changeMessage(message.confirmResourcePlacement(props.selectedPawn.title.toLowerCase()));

            return <button onClick={() => placeSelectedResource(props)}> PLACE</button>
        }

    } else {

        if (props.selectedPawn.type >= 0 && props.selectedSquare) {
            return (
                <>
                    <button onClick={() => nextRound(props)}>NEXT</button>
                    <button onClick={() => placeSelectedBuilding(props)}> PLACE</button>
                </>
            );
        }
        return <button onClick={() => nextRound(props)}>NEXT</button>;
    }
}

const ResourceSelector = props => {
    return (
        <div className="resourceSelector">
            Select resource
            <Resource id={0} />
            <Resource id={1} />
            <Resource id={2} />
            {props.message} <br />
            {renderActionHelper(props)}
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

export default connect(mapStateToProps, { changePhaseTo, placeResource, clearSelection, changeMessage, placeBuilding, feedCottages, newGame })(ResourceSelector);