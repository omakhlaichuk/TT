import React from 'react';
import { connect } from 'react-redux';

import preparePattern from './preparePattern';

//import { selectResource, changePhaseTo, placeResource, clearSelection } from '../actions';

const PatternDetector = ({ selectedPattern, board }) => {
    const showPattern = (pattern, board) => {      
        console.log( preparePattern(pattern, board));
    }

    return (
        <div>
            <button onClick={() => showPattern(selectedPattern, board)}>Show Pattern</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedPattern: state.selectedPattern,
        board: state.board

    }
};

export default connect(mapStateToProps, {})(PatternDetector);
