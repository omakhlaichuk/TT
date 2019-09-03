import React from 'react';
import { connect } from 'react-redux';

//import '../css/square.css';
import { selectSquare, selectPattern, changeMessage } from './../actions';
import {
    message,
    RESOURCE_PHASE,
    BUILDING_PHASE,
    EMPTY_SQUARE,
    RESOURCE
} from './constants';
//import { messageConfirmResourcePlacement } from './messages';

class Square extends React.Component {

    onCellClick(phase) {
        const filling = this.props.square;

        if (this.props.phase === RESOURCE_PHASE) {
            if (filling === EMPTY_SQUARE) {
                //empty squares can be selected for resource placing
                this.props.selectSquare(this.props.index);
                if (this.props.selectedPawn.title) {
                    this.props.changeMessage(
                        message.confirmResourcePlacement(this.props.selectedPawn.title)
                    );
                }
            } else { this.props.selectSquare(null) }
        } else if (this.props.phase === BUILDING_PHASE) {
            if (!this.props.selectedPawn.title && filling.type === RESOURCE) {
                //select resorces to check pattern
                this.props.selectPattern(this.props.index);
            } else if (this.props.selectedPawn.title) {
                //select square for placing building
                //TODO: add property to build anywhere
                if (this.props.selectedPattern.find(cell => cell === this.props.index)) {
                    this.props.selectSquare(this.props.index);
                    this.props.changeMessage(message.confirmBuildingPlacement(this.props.selectedPawn.title));

                }
            }
        }
    }

    renderIcon() {
        if (this.props.square.type >=0)   {
            return <img src={`/images/${this.props.square.type}.png`} alt={this.props.square.type} />
        }

        if(this.props.selectedSquare === this.props.index && this.props.selectedPawn.type >= 0 ){
            return <img src={`/images/${this.props.selectedPawn.type}.png`} alt={this.props.selectedPawn.type} />
        }
    }


    render() {
        //style cells
        let squareCalss = "";
        if (this.props.selectedSquare === this.props.index) {
            squareCalss += " selectedSquare ";
            //console.log(this.props.selectedPawn.type);
            if (this.props.selectedPawn.type === RESOURCE) { squareCalss += this.props.selectedPawn.title.toLowerCase() }

        }
        if (this.props.selectedPattern.find(el => el === this.props.index)) { squareCalss += " patternedSquare " }
        if (this.props.square.type === RESOURCE) { squareCalss += this.props.square.title.toLowerCase() }

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

