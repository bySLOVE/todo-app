import React, { Component } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super(props);
    const initialTime = (props.minutes || 0) * 60 + (props.seconds || 0);
    this.state = {
      isEditing: false,
      newDescription: this.props.description,
      timeAgo: this.getFormattedTime(),
      remainingTime: initialTime,
      isRunning: false,
    };
    this.inputRef = React.createRef();
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
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
    if (!prevProps.completed && this.props.completed) {
      clearInterval(this.timer);
      this.setState({ remainingTime: 0, isRunning: false });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.timer);
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
    } else if (event.key === 'Escape') {
      this.setState({ isEditing: false, newDescription: this.props.description });
    }
  }

  handleSaveClick() {
    const { id } = this.props;
    const { newDescription } = this.state;
    this.props.onEdit(id, newDescription);
    this.setState({ isEditing: false });
  }

  startTimer() {
    if (this.state.isRunning || this.state.remainingTime <= 0) return;

    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.remainingTime <= 1) {
          clearInterval(this.timer);
          return { remainingTime: 0, isRunning: false };
        }
        return { remainingTime: prevState.remainingTime - 1 };
      });
    }, 1000);

    this.setState({ isRunning: true });
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.setState({ isRunning: false });
  }

  render() {
    const { id, description, completed, onDeleted, onToggleCompleted } = this.props;
    const { isEditing, newDescription, timeAgo } = this.state;
    const minutes = Math.floor(this.state.remainingTime / 60);
    const seconds = this.state.remainingTime % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
      <li className={`todo-list-item ${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={() => onToggleCompleted(id)} />
          <label>
            <span className="title">{description}</span>
            <div className="timer-controls">
              <button className="icon icon-play" onClick={this.startTimer}></button>
              <button className="icon icon-pause" onClick={this.pauseTimer}></button>
              <span className="timer">{formattedTime}</span>
            </div>
            <span className="created">{timeAgo}</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEditClick}></button>
          <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
        </div>
        <input
          type="text"
          className="edit"
          value={newDescription}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          ref={this.inputRef}
        />
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
