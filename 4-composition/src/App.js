import './App.css';
import React, { useState } from 'react';

// Level 1
function App() {
  const [username, setUsername] = useState("george89")
  return (
    <div className="App border">
      <h3>App</h3>
      <AddTodo />
      <ListTodo username={username} />
    </div>
  );
}

// Level 2
function AddTodo() {
  return (
    <div className='border'>
      <h3>Add Todo</h3>
    </div>
  );
}

// Level2
function ListTodo({ username }) {
  return (
    <div className='border'>
      <h3>List Of Todos</h3>
      <TodoItem username={username} />
    </div>
  );
}

// Level 3
function TodoItem({ username }) {
  return (
    <div className='border'>
      <h3>Todo Item</h3>
      <TodoItemNote username={username} />
    </div>
  )
}

// Level 4 
function TodoItemNote({ username }) {
  return (
    <div className='border'>
      <h3 >Todo Item Note</h3>
      <span>User: {username}</span>
    </div>
  )
}

export default App;
