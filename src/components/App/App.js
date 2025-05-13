import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const getFilteredTasks = () => {
    if (filter === 'active') return tasks.filter((task) => !task.completed);
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    return tasks;
  };

  const deleteItem = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addTask = (description, minutes, seconds) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
    const totalSeconds = parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10);
    const newTask = {
      id: maxId,
      created: new Date(),
      description,
      completed: false,
      remainingTime: totalSeconds,
      isRunning: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTimer = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, isRunning: !task.isRunning };
        }
        return task;
      })
    );
  };

  const handleCompleteToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed, isRunning: false };
        }
        return task;
      })
    );
  };

  const tick = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id && task.remainingTime > 0) {
          const newTime = task.remainingTime - 1;
          return {
            ...task,
            remainingTime: newTime,
            isRunning: newTime === 0 ? false : task.isRunning,
          };
        }
        return task;
      })
    );
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const editTask = (id, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, description: newDescription } : task))
    );
  };

  const filteredTasks = getFilteredTasks();
  const activeTaskCount = tasks.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <NewTaskForm onTaskAdded={addTask} />
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleted={deleteItem}
          onToggleCompleted={handleCompleteToggle}
          onEdit={editTask}
          onToggleTimer={toggleTimer}
          onTick={tick}
        />
        <Footer
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompletedTasks}
          activeTaskCount={activeTaskCount}
        />
      </section>
    </section>
  );
}

export default App;
