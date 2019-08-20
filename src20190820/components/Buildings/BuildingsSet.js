import React from 'react';
import { connect } from 'react-redux';

import Building from './Building';
import '../../css/buildings.css';

const BuildingsSet = props => {
  return (
    <div className="buildings">
      {props.initialBuilding.map((building, index) =>
        <Building key={building} index={index} title={building} />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    initialBuilding: state.initialBuilding
  }
};

export default connect(mapStateToProps)(BuildingsSet);


