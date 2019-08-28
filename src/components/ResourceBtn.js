import React from 'react';
import { connect } from 'react-redux';

import { selectPawn, clearSelection, changeMessage } from '../actions';
import { message } from './constants';


const ResourceBtn = props => {

    const resourceSelection = resource => {
        //select resource
       props.clearSelection();
        props.selectPawn(resource);
        props.changeMessage(message.placeResource(resource.title));

    }

    return <button
            key={props.resource.title}
            onClick={() => { resourceSelection(props.resource) }}
            className={`${props.resource.title.toLowerCase()} resourceBtn`}
        ></button>
};



export default connect(null, { selectPawn, clearSelection, changeMessage })(ResourceBtn);