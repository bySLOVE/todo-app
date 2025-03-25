import React from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import "./App.css";


const App = () => {
  const tasks = [
    { id: 1, description: "Completed task", created: "created 17 seconds ago", completed: true },
    { id: 2, description: "Editing task", created: "created 5 minutes ago", completed: false },
    { id: 3, description: "Active task", created: "created 10 minutes ago", completed: false },
  ];

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList tasks={tasks} />
        <Footer />
      </section>
    </section>
  );
};

export default App;