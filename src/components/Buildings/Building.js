import React from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


import { fetchBuilding, selectPawn, changeMessage, selectSquare, scoreBuilding } from './../../actions';
import data from './buildings.json';
import { SCORING_PHASE } from './../constants';
import { calcScore } from './scoring';
import { rotateAndMirrorPattern, } from './patternHandler';
import styles from './../../css/Building.module.css';


class Building extends React.Component {

    loadBuilding() {
        //upload data from json
        const buildingForFetching = data[this.props.title];
        //add all variants of the pattern
        buildingForFetching.patterns = rotateAndMirrorPattern(buildingForFetching.pattern);
        //load Building to the state
        this.props.fetchBuilding(buildingForFetching);
    }
    componentDidMount() {
        this.loadBuilding();
    }

    componentDidUpdate() {
        //fetching building data if the game restarted
        if (!this.props.building) { this.loadBuilding(); }
    }

    renderScoring() {
        if (this.props.phase === SCORING_PHASE) {
            this.props.scoreBuilding(this.props.index, calcScore[this.props.building.title](this.props.board));
            return <p>Score: {this.props.building.score}</p>;
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
                        className={`${styles.resource} ${resource[1].toLowerCase()}`}
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
                    <Card bg="light" style={{ height: '16rem' }} className={styles.building}>
                        <Card.Header style={{ height: '2.5rem' }} className={styles.buildingTitle}>{this.props.building.title}
                            <img src={`/images/${this.props.building.type}.png`} alt={this.props.building.type} /></Card.Header>
                        <Card.Body>
                            <Card.Title className={styles.buildingPattern}> {this.renderPattern()} </Card.Title>
                            <Card.Text>
                                {this.props.building.ability}
                                {this.renderScoring() }
                            </Card.Text>
                        </Card.Body>
                    </Card>
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

export default connect(mapStateToProps, { fetchBuilding, selectPawn, changeMessage, selectSquare, scoreBuilding })(Building);