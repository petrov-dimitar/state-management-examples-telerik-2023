import './App.css';
import React, { useState } from 'react';

// 1. Create a context
// 2. Provide the context
// 3. Use the context

function App() {
  const [username, setUsername] = useState('gorg2213')
  return (
    <div className="App border">
      <h3>App Component</h3>
      <AddTodo />
      <ListTodo />
    </div>
  );
}

function AddTodo() {
  return (
    <div className='border'>
      <h3>Add Todo Component</h3>
    </div>
  );
}

function ListTodo() {
  return (
    <div className='border'>
      <h3>List Of Todos Component</h3>
      <TodoItem />
    </div>
  );
}

function TodoItem() {
  return (
    <div className='border'>
      <h3>Todo Item Component</h3>
      <TodoItemNote />
    </div>
  )
}

function TodoItemNote() {
  return (
    <div className='border'>
      <h3 >Todo Item Note</h3>
      <span>User:</span>
    </div>
  )
}

export default App;
