import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchBuilding, selectPawn, changeMessage, selectSquare } from './../../actions';
import data from './buildings.json';
import { message, GAME_PHASE, SCORING_PHASE } from './../constants';
import { calcScore } from './scoring';
import { rotateAndMirrorPattern, pointToIndex, preparedPattern } from './patternHandler'

class Building extends React.Component {

    selectBuilding() {
        if (this.props.phase === GAME_PHASE) {

            const pp = preparedPattern(this.props.selectedPattern, this.props.board)
            const ppp = pointToIndex(pp);
            let canSelectPawn = this.props.building.patterns.find(pattern => _.isEqual(pattern, ppp));
            if (canSelectPawn) {
                this.props.changeMessage(message.patternMatchesBuilding(this.props.building.title));
                this.props.selectPawn(this.props.building);
            } else {
                this.props.selectPawn({});
                this.props.selectSquare(null);
                this.props.changeMessage(message.patternDoesNotMatchBuilding(this.props.building.title));
            }
        }
    }

    componentDidMount() {
        //upload data from json
        const buildingForFetching = data[this.props.title];
        //add all variants of the pattern
        buildingForFetching.patterns = rotateAndMirrorPattern(buildingForFetching.pattern);
        //load Building to the state
        this.props.fetchBuilding(buildingForFetching);
    }

    renderScoring() {
        if (this.props.phase === SCORING_PHASE) {
            return calcScore[this.props.building.title](this.props.board)
        };
    }

    renderPattern() {
        const style = (col, row) => {
            return {
                gridColumn: col,
                gridRow: row
            }
        }
        return (
            <>
                {this.props.building.pattern.map(
                    resource => <div key={resource[0]}
                        className={`resource ${resource[1].toLowerCase()}`}
                        style={style(resource[0] % 10, Math.floor(resource[0] / 10))}
                    ></div>
                )}
            </>
        );
    }

    render() {
        if (!this.props.building) {
            return null;
        } else {
            return (
                <div className="building">
                    <div className="buildingTitle">{this.props.building.title}
                        <img src={`/images/${this.props.building.type}.png`} alt={this.props.building.type} />
                    </div>
                    <div className="buildingPattern"> {this.renderPattern()} </div>
                    <div className="buildingAbility">{this.props.building.ability} </div>
                    <button
                        onClick={() => this.selectBuilding()}
                        disabled={!(this.props.selectedPattern.length === this.props.building.pattern.length)}
                    >
                        Check the pattern
                     </button>
                    {this.renderScoring()}
                </div>
            );
        }
    }

};

const mapStateToProps = (state, ownProps) => {
    return {
        phase: state.phase,
        building: state.buildings[ownProps.index],
        selectedPattern: state.selectedPattern,
        board: state.board
    }
};

export default connect(mapStateToProps, { fetchBuilding, selectPawn, changeMessage, selectSquare })(Building);