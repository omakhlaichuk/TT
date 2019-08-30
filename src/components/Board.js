import React from 'react';
import { connect } from 'react-redux';


import Square from './Square';
import styles from '../css/Board.module.css';


const Board = (props) => {

  //4*4 board
  return (
    <div className={styles.board}>
      <ul>
        {props.indexes.map((value) => <Square key={value} index={value} />)}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    indexes: state.board.indexes
  }
};

export default connect(mapStateToProps, {})(Board);
//export default Board;
