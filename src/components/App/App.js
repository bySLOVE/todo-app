import React, {Component} from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import "./App.css";


export default class App extends Component {

  state = {
    tasks: [
      { id: 1, description: "Completed task", created: "created 17 seconds ago", completed: true },
      { id: 2, description: "Editing task", created: "created 5 minutes ago", completed: false },
      { id: 3, description: "Active task", created: "created 10 minutes ago", completed: false },
    ],
    filter: "all",
  };

  setFilter = (filter) => {
    this.setState ({filter});
  };

  getFilteredTasks = () => {
    const {tasks,filter} = this.state;

    if (filter === "active") {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    return tasks
  }

  /// удаление задачи
  deleteItem = (id) => {
    this.setState(({tasks}) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newArray = [
        ...tasks.slice(0, idx),
        ...tasks.slice(idx + 1)
      ];
      
      return {
        tasks: newArray
      };
    })
  };
  
  /// переключение состояния 
  toggleCompleted = (id) => {
    this.setState(({tasks}) => ({
      tasks: tasks.map((tasks) => 
      tasks.id === id ? {...tasks, completed: !tasks.completed} :tasks
    ),
    }));
  };

  /// добавление новой задачи
  addTask = (description) => {
    this.setState(({tasks}) => {
      const maxId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

      const newTask = {
        id: maxId,
        description,
        completed: false
      };

      return {
        tasks: [...tasks, newTask]
      };
    });
  };
  
  /// чистка выполненных заданий
  clearCompletedTasks = () => {
    this.setState(({tasks}) => ({
      tasks: tasks.filter((task) => !task.completed),
    }));
  };

  render () {
    const filteredTasks = this.getFilteredTasks()
    const activeTaskCount = this.state.tasks.filter((task) => !task.completed).length
    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList 
          tasks={filteredTasks}
          onDeleted = {this.deleteItem} 
          onToggleCompleted={this.toggleCompleted}/>
          <Footer
          filter={this.state.filter}
          setFilter={this.setFilter}
          clearCompleted={this.clearCompletedTasks}
          activeTaskCount={activeTaskCount}/>
        </section>
      </section>
    );
  }
};

