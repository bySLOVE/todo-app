import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onDeleted, onToggleCompleted, onEdit } = this.props;
    return (
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            description={task.description}
            created={task.created}
            completed={task.completed}
            minutes={task.minutes}
            seconds={task.seconds}
            onDeleted={onDeleted}
            onToggleCompleted={onToggleCompleted}
            onEdit={onEdit}
          />
        ))}
      </ul>
    );
  }
}

TaskList.defaultProps = {
  tasks: [],
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      created: PropTypes.string,
      completed: PropTypes.bool,
      minutes: PropTypes.number,
      seconds: PropTypes.number,
    })
  ),
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
