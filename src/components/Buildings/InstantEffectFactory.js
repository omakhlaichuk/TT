import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ResourceBtn from '../ResourceBtn';

import { changeResourceToWild, clearSelection, changeMessage } from '../../actions';
import { ALL_RESOURCES, message } from '../constants';


const InstantEffectFactory = props => {

    //above Board and ToolbarWithResourse
    return ReactDOM.createPortal(
        <div className="instantEffectFactory">
            <div className="header"> {message.instantEffectFactoryChoose}</div>
            <div className="content">
                <p> {
                    //display 5 base resources
                    ALL_RESOURCES.map(
                        resource => <ResourceBtn key={resource.title} resource={resource} />
                    )
                }
                </p>
            </div>
            {// confirm transmutation after resource selection:
                props.selectedResourceTitle ?
                    <div className="actions">
                        <button
                            onClick={() => {
                                //remove InstantEffectFactory
                                props.completeInstantEffect();
                                //change selected resource to Wild
                                props.changeResourceToWild();
                                //clear selected pawn
                                props.clearSelection();
                                //return successfulBuildingPlacement message 
                                props.changeMessage(message.successfulBuildingPlacement);
                            }}
                        >{message.instantEffectFactoryConfirm(props.selectedResourceTitle)}</button>

                    </div> : null}
        </div >,
        document.querySelector('.flexRow')
    )
};

const mapStateToProps = state => {
    return {
        selectedResourceTitle: state.selectedPawn.title,
    }
};

export default connect(mapStateToProps, { changeResourceToWild, clearSelection, changeMessage })(InstantEffectFactory);