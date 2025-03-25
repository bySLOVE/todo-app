import React from "react";


const NewTaskForm = () => {
    return (
        <header className="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus/>
      </header>
    );
};

export default NewTaskForm;