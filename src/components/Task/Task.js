import React, { Component } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newDescription: this.props.description,
      timeAgo: this.getFormattedTime(),
    };
    this.inputRef = React.createRef();
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ timeAgo: this.getFormattedTime() });
    }, 60000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isEditing && this.state.isEditing) {
      const input = this.inputRef.current;
      if (input) {
        input.focus();
        input.select();
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getFormattedTime() {
    const createdDate = new Date(this.props.created);
    if (isNaN(createdDate.getTime())) {
      console.error('Invalid date:', this.props.created);
      return 'Invalid Date';
    }
    return `Created ${formatDistanceToNow(createdDate, { addSuffix: true })}`;
  }

  handleEditClick() {
    this.setState({ isEditing: true });
  }

  handleChange(event) {
    this.setState({ newDescription: event.target.value });
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleSaveClick();
    }
  }

  handleSaveClick() {
    const { id } = this.props;
    const { newDescription } = this.state;
    this.props.onEdit(id, newDescription);
    this.setState({ isEditing: false });
  }

  render() {
    const { id, description, completed, onDeleted, onToggleCompleted } = this.props;
    const { isEditing, newDescription, timeAgo } = this.state;
    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={() => onToggleCompleted(id)} />
          {isEditing ? (
            <input
              type="text"
              className="editing"
              value={newDescription}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              ref={this.inputRef}
            />
          ) : (
            <>
              <label>
                <span className="description">{description}</span>
                <span className="created">{timeAgo}</span>
              </label>
              <button className="icon icon-edit" onClick={this.handleEditClick}></button>
            </>
          )}
          {!isEditing && <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>}
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  description: 'new Task',
  created: new Date(),
  completed: false,
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  created: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
