import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: 'all',
    };
    this.setFilter = this.setFilter.bind(this);
    this.getFilteredTasks = this.getFilteredTasks.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.addTask = this.addTask.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  getFilteredTasks() {
    const { tasks, filter } = this.state;

    if (filter === 'active') {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  }

  /// удаление задачи
  deleteItem(id) {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];

      return {
        tasks: newArray,
      };
    });
  }

  /// переключение состояния
  toggleCompleted(id) {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }));
  }

  /// добавление новой задачи
  addTask(description, minutes, seconds) {
    this.setState(({ tasks }) => {
      const maxId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

      const newTask = {
        id: maxId,
        created: new Date(),
        description,
        completed: false,
        minutes,
        seconds,
      };

      return {
        tasks: [...tasks, newTask],
      };
    });
  }

  /// чистка выполненных заданий
  clearCompletedTasks() {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed),
    }));
  }

  editTask(id, newDescription) {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, description: newDescription } : task)),
    }));
  }

  render() {
    const filteredTasks = this.getFilteredTasks();
    const activeTaskCount = this.state.tasks.filter((task) => !task.completed).length;
    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.toggleCompleted}
            onEdit={this.editTask}
          />
          <Footer
            filter={this.state.filter}
            setFilter={this.setFilter}
            clearCompleted={this.clearCompletedTasks}
            activeTaskCount={activeTaskCount}
          />
        </section>
      </section>
    );
  }
}
