import React from 'react';
import { connect } from 'react-redux';

import { selectPawn, changePhaseTo, changeMessage, clearSelection } from '../actions';
import { message } from './constants';

class Resource extends React.Component {

    resourceSelection = resource => {
        this.props.clearSelection();
        this.props.selectPawn(resource);
        this.props.changeMessage(message.placeResource(resource.title));
    }

    render() {
        if (!this.props.resource) { return null };
        return (
            <div>
                <button
                    onClick={() => { this.resourceSelection(this.props.resource) }}
                    className={`${this.props.resource.title.toLowerCase()} resourceBtn`}
                ></button>
                {this.props.resource.title.toLowerCase()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedPawn: state.selectedPawn,
        phase: state.phase,
        resource: state.resources[ownProps.id]
    }
};

export default connect(mapStateToProps, { selectPawn, changePhaseTo, changeMessage, clearSelection })(Resource);
