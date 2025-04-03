import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

export default class Footer extends Component {
  render() {
    const { filter, setFilter, activeTaskCount, clearCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{activeTaskCount} items left</span>
        <TaskFilter filter={filter} setFilter={setFilter} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  filter: 'all',
  activeTaskCount: 0,
  clearCompleted: () => {},
  setFilter: () => {},
};

Footer.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
  activeTaskCount: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
};
