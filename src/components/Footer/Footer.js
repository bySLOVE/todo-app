import React from "react";
import TaskFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";


const Footer = ({filter, setFilter, activeTaskCount, clearCompleted}) => {
    return (
        <footer className="footer">
          <span className="todo-count">{activeTaskCount} items left</span>
          <TaskFilter filter={filter} setFilter={setFilter}/>
          <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
    );
};

export default Footer;