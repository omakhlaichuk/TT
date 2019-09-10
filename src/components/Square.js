import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


import { selectSquare, selectPattern, selectPawn, changeMessage } from './../actions';
import { pointToIndex, preparePattern } from './Buildings/patternHandler';
import {
    message,
    EMPTY_SQUARE,
    GAME_PHASE,
    RESOURCE,
} from './constants';
import styles from '../css/Square.module.css';


class Square extends React.Component {

    //add the building to the selectedPawn if pattern match
    selectBuilding(building, pattern) {
        if (this.props.phase === GAME_PHASE) {

            const preparedPattern = pointToIndex(preparePattern(pattern, this.props.board), "title");
            let canSelectPawn = building.patterns.find(pattern => _.isEqual(pattern, preparedPattern));

            if (canSelectPawn) {
                this.props.changeMessage(message.patternMatchesBuilding(building.title));
                this.props.selectPawn(building);
            }
        }
    }

    onCellClick() {
        const filling = this.props.square;

        //select empty square for resource placing
        if (this.props.selectedPawn.type === RESOURCE && filling === EMPTY_SQUARE) {
            this.props.selectSquare(this.props.index);
            this.props.changeMessage(
                message.confirmResourcePlacement(this.props.selectedPawn.title)
            );
        }

        //select square for the building placing
        if (this.props.selectedPawn.type >= 0) {
            if (this.props.selectedPattern.find(cell => cell === this.props.index)) {
                this.props.selectSquare(this.props.index);
                this.props.changeMessage(message.confirmBuildingPlacement(this.props.selectedPawn.title));
            }
        }

        //mark square as pattern
        if (!this.props.selectedPawn.title && filling.type === RESOURCE) {
            let updatedPattern;
            //remove or add index to selectedPattern
            if (this.props.selectedPattern.find(cell => cell === this.props.index)) {
                updatedPattern = this.props.selectedPattern.filter(el => el !== this.props.index);
            } else {
                updatedPattern = [...this.props.selectedPattern, this.props.index]
            }
            this.props.selectPattern(updatedPattern);
            //check new pattern
            this.props.buildings.forEach(building => this.selectBuilding(building, updatedPattern));
        }
    }

    renderIcon() {
        if (this.props.square.type >= 0) {
            return <img src={`/images/${this.props.square.type}.png`} alt={this.props.square.type} />
        }

        if (this.props.selectedSquare === this.props.index && this.props.selectedPawn.type >= 0) {
            return <img src={`/images/${this.props.selectedPawn.type}.png`} alt={this.props.selectedPawn.type} />
        }
    }


    render() {
        //style cells
        let squareCalss = styles.square;

        //style cursor as building
        if (this.props.selectedPawn.type >= 0) {
            if (this.props.selectedPattern.find(cell => cell === this.props.index)) {
                squareCalss += ` ${styles[`cursor${this.props.selectedPawn.type}`]}`
            }
            else {
                squareCalss += ` ${styles[`cursor${this.props.selectedPawn.type}cannot`]}`
            }
        };

        //style cursor as resource
        if (this.props.selectedPawn.type === RESOURCE && this.props.square === EMPTY_SQUARE) {
            squareCalss += ` ${styles[`cursor${this.props.selectedPawn.title}`]}`

        }

        if (this.props.selectedSquare === this.props.index) {
            squareCalss += ` ${styles.selectedSquare} `;
            if (this.props.selectedPawn.type === RESOURCE) { squareCalss += this.props.selectedPawn.title.toLowerCase() }

        }
        if (this.props.selectedPattern.find(el => el === this.props.index)) { squareCalss += ` ${styles.patternedSquare} ` }
        if (this.props.square.type === RESOURCE) { squareCalss += ` ${this.props.square.title.toLowerCase()} ` }

        return (
            <li className={squareCalss} onClick={() => { this.onCellClick() }}>
                {this.renderIcon()}
            </li>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        square: state.board[ownProps.index],
        selectedSquare: state.selectedSquare,
        selectedPattern: state.selectedPattern,
        selectedPawn: state.selectedPawn,
        phase: state.phase,
        buildings: state.buildings,
        board: state.board,
    }
};

export default connect(mapStateToProps, { selectSquare, selectPattern, selectPawn, changeMessage })(Square);

