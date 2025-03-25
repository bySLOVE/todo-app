import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = ({tasks}) => {
    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <Task
                key={task.id}
                description={task.description}
                created={task.created}
                completed={task.completed}
                />
            ))}
        </ul>
    );
};

export default TaskList;