import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";

const LOCAL_STORAGE_KEY = "todos";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter is all

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask, isEditing: false } : todo
      )
    );
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTodos = () => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <div className="todo-controls">
        <select
          value={filter}
          className="todo-btn btn"
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
        <button
          className="todo-btn btn"
          onClick={() =>
            setTodos([...todos.sort((a, b) => a.task.localeCompare(b.task))])
          }
        >
          Sort by Name
        </button>
      </div>
      <TodoForm addTodo={addTodo} />
      {filteredTodos().map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTodo} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
          />
        )
      )}
    </div>
  );
};
