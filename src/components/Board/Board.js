import React from 'react';
import PropTypes from 'prop-types';

import boardShape from '../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    editABoard: PropTypes.func.isRequired,
  }

  singleBoardEvent = (e) => {
    e.preventDefault();
    const { board, setSingleBoard } = this.props;
    setSingleBoard(board.id);
  }

  deleteBoardEvent = (e) => {
    e.preventDefault();
    const { deleteBoard, board } = this.props;
    deleteBoard(board.id);
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { editABoard, board } = this.props;
    editABoard(board);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="card text-center">
        <div className="card-header"><h5>{board.name}</h5></div>
        <div className="card-body">
          <p className="card-title">{board.description}</p>
          <p className="card-text">
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
          </p>
          <div className="btn-group" role="group">
            <button className="btn btn-secondary" onClick={this.singleBoardEvent}><i className="far fa-eye"></i></button>
            <button className="btn btn-warning" onClick={this.editBoardEvent}><i className="far fa-edit"></i></button>
          </div>
        </div>
        <div className="card-footer text-muted"><button className="btn btn-danger" onClick={this.deleteBoardEvent}>delete</button></div>
      </div>
    );
  }
}

export default Board;
