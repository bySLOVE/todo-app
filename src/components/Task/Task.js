import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

function getFormattedTime(date) {
  const createdDate = new Date(date);
  if (isNaN(createdDate.getTime())) {
    console.error('Invalid date:', date);
    return 'Invalid Date';
  }
  return `Created ${formatDistanceToNow(createdDate, { addSuffix: true })}`;
}

function Task({
  id,
  description,
  created,
  completed,
  onDeleted,
  onToggleCompleted,
  onEdit,
  remainingTime,
  isRunning,
  onToggleTimer,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const [timeAgo, setTimeAgo] = useState(getFormattedTime(created));
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getFormattedTime(created));
    }, 60000);
    return () => clearInterval(interval);
  }, [created]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSaveClick = () => {
    if (newDescription.trim() === '') return;
    onEdit(id, newDescription.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveClick();
    } else if (e.key === 'Escape') {
      setNewDescription(description);
      setIsEditing(false);
    }
  };

  const formattedTime = `${String(Math.floor(remainingTime / 60)).padStart(2, '0')}:${String(
    remainingTime % 60
  ).padStart(2, '0')}`;

  const canStartTimer = !completed && remainingTime > 0 && !isRunning;

  return (
    <li className={`todo-list-item ${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onToggleCompleted(id)} />
        <label>
          <span className="title">{description}</span>
          <div className="timer-controls">
            <button className="icon icon-play" onClick={() => canStartTimer && onToggleTimer(id)} />
            <button className="icon icon-pause" onClick={() => isRunning && onToggleTimer(id)} />
            <span className="timer">{formattedTime}</span>
          </div>
          <span className="created">{timeAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={() => setIsEditing(true)} />
        <button className="icon icon-destroy" onClick={() => onDeleted(id)} />
      </div>
      <input
        type="text"
        className="edit"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    </li>
  );
}

export default Task;
