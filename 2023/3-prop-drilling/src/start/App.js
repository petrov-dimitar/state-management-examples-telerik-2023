import './App.css';
import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState("george89")
  return (
    <div className="App border">
      <h3>App Component</h3>
      <AddTodoComponent />
      <ListTodoComponent />
    </div>
  );
}

function AddTodoComponent() {
  return (
    <div className='border'>
      <h3>Add Todo Component</h3>
    </div>
  );
}

function ListTodoComponent() {
  return (
    <div className='border'>
      <h3>List Of Todos Component</h3>
      <TodoItemComponent />
    </div>
  );
}

function TodoItemComponent() {
  return (
    <div className='border'>
      <h3>Todo Item Component</h3>
      <TodoItemNoteComponent />
    </div>
  )
}

function TodoItemNoteComponent() {
  return (
    <div className='border'>
      <h3 >Todo Item Note</h3>
      <span>User:</span>
    </div>
  )
}

export default App;
