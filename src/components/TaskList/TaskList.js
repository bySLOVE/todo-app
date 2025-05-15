import React from 'react';

import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ tasks, onDeleted, onToggleCompleted, onEdit, onToggleTimer }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          created={task.created}
          completed={task.completed}
          onDeleted={onDeleted}
          onToggleCompleted={onToggleCompleted}
          onEdit={onEdit}
          onToggleTimer={onToggleTimer}
          remainingTime={task.remainingTime}
          isRunning={task.isRunning}
        />
      ))}
    </ul>
  );
}

export default TaskList;
