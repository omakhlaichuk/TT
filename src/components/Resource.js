import React from 'react';
import { connect } from 'react-redux';

import { selectPawn, changePhaseTo, changeMessage, clearSelection } from '../actions';
import { WILD, ALL_RESOURCES} from './constants';
import ResourceBtn from './ResourceBtn';

class Resource extends React.Component {
/*
    resourceSelection = resource => {
        //select resource
        this.props.clearSelection();
        this.props.selectPawn(resource);
        this.props.changeMessage(message.placeResource(resource.title));

    }

    renderResourceBtn = resource => {
        return <button
            key={resource.title}
            onClick={() => { this.resourceSelection(resource) }}
            className={`${resource.title.toLowerCase()} resourceBtn`}
        ></button>
    }
*/
    render() {
        if (!this.props.resource) { return null };
        return (
            <div>
                {`${this.props.resource.title.toLowerCase()}: `}
                {this.props.resource === WILD ?
                    ALL_RESOURCES.map(
                        resource => {
                            return  <ResourceBtn key={resource.title} resource={ {...resource, fromWild:true} } />; 
                        })
                    : <ResourceBtn resource={this.props.resource} />
                }
                {}
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
