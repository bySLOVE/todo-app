import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      minutes: '',
      seconds: '',
    };
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onLabelChange(event) {
    this.setState({ description: event.target.value });
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.onSubmit(event);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { description, minutes, seconds } = this.state;
    const min = Number(minutes);
    const sec = Number(seconds);
    if (!description.trim()) {
      alert('Описание задачи не может быть пустым');
      return;
    }

    if (min === 0 && sec === 0) {
      alert('Время не может быть 0 минут и 0 секунд');
      return;
    }
    this.props.onTaskAdded(description, Number(minutes), Number(seconds));
    this.setState({ description: '', minutes: '', seconds: '' });
  }

  onInputChange(e) {
    const { name, value } = e.target;

    if ((name === 'minutes' || name === 'seconds') && /[^0-9]/.test(value)) {
      return;
    }

    this.setState({ [name]: value });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.description}
            onChange={this.onLabelChange}
            onKeyDown={this.onKeyDown}
          />
          <input
            type="text"
            name="minutes"
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.minutes}
            onChange={this.onInputChange}
            onKeyDown={this.onKeyDown}
          />
          <input
            type="text"
            name="seconds"
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.seconds}
            onChange={this.onInputChange}
            onKeyDown={this.onKeyDown}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};
