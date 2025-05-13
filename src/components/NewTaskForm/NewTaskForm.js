import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ onTaskAdded }) {
  const [description, setDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onLabelChange = (event) => setDescription(event.target.value);

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'minutes' || name === 'seconds') && /[^0-9]/.test(value)) {
      return;
    }

    if (name === 'minutes') setMinutes(value);
    if (name === 'seconds') setSeconds(value);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const min = Number(minutes);
    const sec = Number(seconds);
    if (!description.trim()) {
      alert('Описание задачи не может быть пустым');
      return;
    }

    if (min === 0 && sec === 0) {
      alert('Время не может быть 0 минут и 0 секунд');
      return;
    }
    onTaskAdded(description, min, sec);
    setDescription('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={description}
          onChange={onLabelChange}
          onKeyDown={onKeyDown}
        />
        <input
          type="text"
          name="minutes"
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutes}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <input
          type="text"
          name="seconds"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={seconds}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

export default NewTaskForm;
