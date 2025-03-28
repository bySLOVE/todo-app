import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = ({tasks, onDeleted, onToggleCompleted}) => {
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
                onToggleCompleted ={onToggleCompleted}
                />
            ))}
        </ul>
    );
};

export default TaskList;