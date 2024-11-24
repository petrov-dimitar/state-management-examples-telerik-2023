import './App.css';
import React, { useState } from 'react';

function App() {
  const [username] = useState("george89")
  return (
    <div className="App border">
      <h3>App</h3>
      <AddTodo />
      <ListTodo>
        <TodoItem >
          <TodoItemNote username={username} />
        </TodoItem>
      </ListTodo>
    </div>
  );
}

function AddTodo() {
  return (
    <div className='border'>
      <h3>Add Todo</h3>
    </div>
  );
}

function ListTodo({ children }) {
  return (
    <div className='border'>
      <h3>List Of Todos</h3>
      {children}
    </div>
  );
}

function TodoItem({ children }) {
  return (
    <div className='border'>
      <h3>TodoItem</h3>
      {children}
    </div>
  )
}

function TodoItemNote({ username }) {
  console.log("AddTodoComponent rerender");
  return (
    <div className='border'>
      <h3 >Todo Item Note</h3>
      <span>User: {username}</span>
    </div>
  )
}

export default App;
