import React from 'react';
import { connect } from 'react-redux';

import { changePhaseTo, placeResource, clearSelection, placeBuilding, changeMessage, feedCottages } from '../actions';
import {
    message,
    RESOURCE_PHASE,
    BUILDING_PHASE,
    FEEDING_PHASE,
    SCORING_PHASE,
    EMPTY_SQUARE
} from '../components/constants';
import { calcFedCottages } from '../components/Buildings/scoring';


class Toolbar extends React.Component {

    plasePawn = () => {
        if (this.props.phase === RESOURCE_PHASE && this.props.selectedPawn && this.props.selectedSquare) {
            //place the resource to the grid
            this.props.placeResource();
            this.props.clearSelection();
            this.props.changePhaseTo(BUILDING_PHASE);
            this.props.changeMessage(message.showPattern);
        } else if (this.props.phase === BUILDING_PHASE && this.props.selectedPawn && this.props.selectedSquare) {
            //place the building to the grid & removing the resources
            if ("Square for placing suitable") {
                this.props.placeBuilding();
                // this.props.clearSelection();
                this.props.changeMessage("вы успешно поставили здание, можете поставить еще!");
            } else {
                this.props.changeMessage("в это место нельзя поставить здание, попробуйте другое место! - сейчас место не выбирает");

            }

        };
    }
    //after resource placing new round can be started
    nextRound = () => {
        switch (this.props.phase) {

            case BUILDING_PHASE:
                this.props.clearSelection();
                //check is it empty squares
                if (this.props.board.indexes.find(i => this.props.board[i] === EMPTY_SQUARE)) {
                    this.props.changePhaseTo(RESOURCE_PHASE);
                    this.props.changeMessage(message.selectResource);
                } else {
                    this.props.changeMessage("Переходим к кормежке?");
                    this.props.feedCottages(
                        calcFedCottages(this.props.board, this.props.buildings)
                    );
                    this.props.changePhaseTo(FEEDING_PHASE);
                }
                break;

            case FEEDING_PHASE:
                this.props.changePhaseTo(SCORING_PHASE);
                this.props.changeMessage("Переходим к подсчету очков?");
                break;

            default:
            this.props.changeMessage('зачем нажимать? - нужно лочить кнопку!!!');
        }
    }

    render() {
        return (
            <div>
                Phase: {this.props.phase} <br />
                {this.props.message} <br />
                <button onClick={() => this.plasePawn()}>Place</button>
                <button onClick={() => this.nextRound()}>NEXT</button>
            </div>
        );
    }

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

export default connect(
    mapStateToProps,
    { changePhaseTo, placeResource, clearSelection, placeBuilding, changeMessage, feedCottages }
)(Toolbar);
