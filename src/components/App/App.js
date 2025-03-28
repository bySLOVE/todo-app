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
  };

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

  toggleCompleted = (id) => {
    this.setState(({tasks}) => ({
      tasks: tasks.map((tasks) => 
      tasks.id === id ? {...tasks, completed: !tasks.completed} :tasks
    ),
    }));
  }

  render () {
    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList tasks={this.state.tasks}
          onDeleted = {this.deleteItem} 
          onToggleCompleted={this.toggleCompleted}/>
          <Footer />
        </section>
      </section>
    );
  }
};

