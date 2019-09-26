import React from 'react';
import { connect } from 'react-redux';


import Square from './Square';
import styles from '../css/Board.module.css';


const Board = (props) => {
  let boardClass = styles.board
  return (
    <>
      <h4>Board:</h4>

      <div className={boardClass}>
        <ul>
          {props.indexes.map((value) => <Square key={value} index={value}
          />)}
        </ul>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    indexes: state.board.indexes,
    selectedPawn: state.selectedPawn,
  }
};

export default connect(mapStateToProps, {})(Board);
//export default Board;
