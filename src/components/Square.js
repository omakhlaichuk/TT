import React from 'react';
import { connect } from 'react-redux';

import { selectSquare, selectPattern, changeMessage } from './../actions';
import {
    message,
    EMPTY_SQUARE,
    RESOURCE
} from './constants';
import styles from '../css/Square.module.css';


class Square extends React.Component {

    onCellClick(phase) {
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
            this.props.selectPattern(this.props.index);
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
        if (this.props.selectedSquare === this.props.index) {
            squareCalss += ` ${styles.selectedSquare} `;
            //console.log(this.props.selectedPawn.type);
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
        phase: state.phase
    }
};

export default connect(mapStateToProps, { selectSquare, selectPattern, changeMessage })(Square);

