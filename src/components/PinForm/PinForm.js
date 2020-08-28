import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    createPin: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    imageUrl: '',
  }

  changeTitleEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeImageUrlEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { title, imageUrl } = this.state;
    const { createPin, boardId } = this.props;

    const newPin = {
      title,
      imageUrl,
      boardId,
      uid: authData.getUid(),
    };

    createPin(newPin);
  }

  render() {
    return (
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="pinTitle">Pin Title</label>
          <input
            type="text"
            className="form-control"
            id="pinTitle"
            placeholder="Enter Pin Title"
            onChange={this.changeTitleEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pinImageUrl">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="pinImageUrl"
            placeholder="image.com/puppies"
            onChange={this.changeImageUrlEvent}
          />
        </div>
        <button className="btn btn-dark" onClick={this.savePinEvent}>Save Pin</button>
      </form>
    );
  }
}

export default PinForm;
