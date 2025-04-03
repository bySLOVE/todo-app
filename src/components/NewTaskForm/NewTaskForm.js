import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onLabelChange(event) {
    this.setState({ description: event.target.value });
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.onSubmit(event);
    }
  }

  onSubmit() {
    if (this.state.description.trim()) {
      this.props.onTaskAdded(this.state.description);
      this.setState({ description: '' });
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.description}
          onChange={this.onLabelChange}
          onKeyDown={this.onKeyDown}
        />
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};
