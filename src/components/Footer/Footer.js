import React from "react";
import TaskFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";


const Footer = () => {
    return (
        <footer className="footer">
          <span className="todo-count">1 items left</span>
          <button className="clear-completed">Clear completed</button>
        </footer>
    );
};

export default Footer;