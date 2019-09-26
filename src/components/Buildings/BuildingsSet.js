import React from 'react';
import { connect } from 'react-redux';
import CardColumns from 'react-bootstrap/CardColumns';

import Building from './Building';
import styles from  './../../css/BuildingsSet.module.css';


const BuildingsSet = props => {
  return (
    <CardColumns className={props.initialBuilding.length === 8 ? styles.buildings8 : styles.buildings7 } > 
      {props.initialBuilding.map((building, index) =>
        <Building key={building} index={index} title={building} />
      )}
    </CardColumns>
  );
}

const mapStateToProps = state => {
  return {
    initialBuilding: state.initialBuilding
  }
};

export default connect(mapStateToProps)(BuildingsSet);


