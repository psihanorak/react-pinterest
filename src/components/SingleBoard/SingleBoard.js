import React from 'react';
import PropTypes from 'prop-types';

import Pin from '../Pin/Pin';
import PinForm from '../PinForm/PinForm';

import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    pins: [],
    showForm: false,
  }

  goGetYoPins = () => {
    const { boardId } = this.props;

    pinsData.getPinsByBoardId(boardId)
      .then((pins) => this.setState({ pins }))
      .catch((err) => console.error('get pins failed', err));
  }

  componentDidMount() {
    const { boardId } = this.props;

    boardsData.getSingleBoard(boardId)
      .then((response) => this.setState({ board: response.data }))
      .catch((err) => console.error('get single board failed', err));

    this.goGetYoPins();
  }

  deletePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => {
        this.goGetYoPins();
      })
      .catch((err) => console.error('delete pin failed', err));
  }

  createPin = (newPin) => {
    pinsData.createPin(newPin)
      .then(() => {
        this.goGetYoPins();
        this.setState({ showForm: false });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { board, pins, showForm } = this.state;
    const { setSingleBoard, boardId } = this.props;

    const pinCards = pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin}/>);

    return (
      <div>
        <h4>{board.name}</h4>
        <div className="mb-3">
          <button className="btn btn-warning" onClick={() => { this.setState({ showForm: !showForm }); }}><i className={showForm ? 'far fa-times-circle' : 'far fa-plus-square'}></i></button>
          {showForm ? <PinForm boardId={boardId} createPin={this.createPin} /> : ''}
        </div>
        <div className="card-columns">
          {pinCards}
        </div>
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>Go Back</button>
      </div>
    );
  }
}

export default SingleBoard;
