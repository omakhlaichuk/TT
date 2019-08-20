import React from 'react';
import { connect } from 'react-redux';


import Square from './Square';
import '../css/board.css';


const Board = (props) => {

  return (
    <div className="board">
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
