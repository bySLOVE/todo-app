import React from "react";
import "./Task.css";

const Task = ({ id, description, created, completed, onDeleted, onToggleCompleted }) => {
  return (
    <li className={completed ? "completed" : ""}>
      <div className="view">
        <input 
        className="toggle" 
        type="checkbox" 
        defaultChecked={completed}
        onChange={() => onToggleCompleted(id)} />
        <label>
          <span className="description">
            {description}
          </span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
      </div>
    </li>
  );
};

export default Task;