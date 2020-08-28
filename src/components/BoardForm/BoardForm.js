import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  static propTypes = {
    createBoard: PropTypes.func.isRequired,
    updateBoard: PropTypes.func.isRequired,
    boardThatIAmEditing: PropTypes.object.isRequired,
    closeForm: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    description: '',
    faClassName: '',
    isEditing: false,
  }

  componentDidMount() {
    const { boardThatIAmEditing } = this.props;
    if (boardThatIAmEditing.name) {
      this.setState({
        name: boardThatIAmEditing.name,
        description: boardThatIAmEditing.description,
        faClassName: boardThatIAmEditing.faClassName,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevBoard = prevProps.boardThatIAmEditing;
    const incomingBoard = this.props.boardThatIAmEditing;
    if (prevBoard.name !== incomingBoard.name) {
      this.setState({
        description: incomingBoard.description || '',
        name: incomingBoard.name || '',
        faClassName: incomingBoard.faClassName || '',
        // eslint-disable-next-line no-unneeded-ternary
        isEditing: incomingBoard.name ? true : false,
      });
    }
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  changeFaClassNameEvent = (e) => {
    e.preventDefault();
    this.setState({ faClassName: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const { name, description, faClassName } = this.state;
    const { createBoard } = this.props;

    const newBoard = {
      name,
      description,
      faClassName,
      uid: authData.getUid(),
    };

    createBoard(newBoard);
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { name, description, faClassName } = this.state;
    const { updateBoard, boardThatIAmEditing } = this.props;

    const myBoardWithChanges = {
      name,
      description,
      faClassName,
      uid: authData.getUid(),
    };

    updateBoard(boardThatIAmEditing.id, myBoardWithChanges);
  }

  closeFormEvent = (e) => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    const {
      description,
      faClassName,
      name,
      isEditing,
    } = this.state;

    return (
      <form className="col-6 offset-3">
        <button className="btn btn-danger" onClick={this.closeFormEvent}>CLOSE FORM</button>
        <div className="form-group">
          <label htmlFor="boardName">Board Name</label>
          <input
            type="text"
            className="form-control"
            id="boardName"
            placeholder="Enter Board Name"
            value={name}
            onChange={this.changeNameEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardDescription">Board Description</label>
          <input
            type="text"
            className="form-control"
            id="boardDescription"
            placeholder="A cool thing about this board"
            value={description}
            onChange={this.changeDescriptionEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardFaClassName">Fontawesome ClassName</label>
          <input
            type="text"
            className="form-control"
            id="boardFaClassName"
            placeholder="Enter FontAwesome ClassName"
            value={faClassName}
            onChange={this.changeFaClassNameEvent}
          />
        </div>
        {
          isEditing
            ? <button className="btn btn-light" onClick={this.editBoardEvent}>Edit Board</button>
            : <button className="btn btn-dark" onClick={this.saveBoardEvent}>Save Board</button>
        }
      </form>
    );
  }
}

export default BoardForm;
