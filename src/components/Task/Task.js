import React from "react";
import "./Task.css";

const Task = ({ description, created, completed}) => {
  return (
    <li className={completed ? "completed" : ""}>
            <div class="view">
              <input class="toggle" type="checkbox" defaultChecked={completed} />
              <label>
                <span class="description">{description}</span>
                <span class="created">{created}</span>
              </label>
              <button class="icon icon-edit"></button>
              <button class="icon icon-destroy"></button>
            </div>
          </li>
  );
};

export default Task;