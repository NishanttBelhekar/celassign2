import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, toggleCompleted, deleteTodo, editTodo }) => {
  const handleToggleCompleted = () => {
    toggleCompleted(task.id);
  };

  return (
    <div className={`Todo ${task.completed ? "completed" : ""}`}>
      <p
        onClick={handleToggleCompleted}
        className={`task-text ${task.completed ? "completed" : ""}`}
      >
        {task.task}
      </p>
      <div className="icon-con">
        <FontAwesomeIcon
          icon={faSquare}
          onClick={handleToggleCompleted}
          className="icon"
        />
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
          className="icon edit-icon"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
          className="icon delete-icon"
        />
      </div>
    </div>
  );
};
