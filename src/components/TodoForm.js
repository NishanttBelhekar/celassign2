import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length < 5) {
      setError("Task should be more than 5 letters!"); // Set error message if task length is less than 5
    } else {
      addTodo(value.trim());
      setValue("");
      setError("");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(""); // Clear error message on input change
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What is the task today? (More than 5 letters)"
        onChange={handleChange}
        required // Add HTML5 validation for required field
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
      {error && <p className="error-msg">{error}</p>}{" "}
      {/* Display error message if any */}
    </form>
  );
};
