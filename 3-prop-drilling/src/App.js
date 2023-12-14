import './App.css';
import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState("george89")
  return (
    <div className="App border">
      <h3>App Component</h3>
      <AddTodoComponent />
      <ListTodoComponent username={username} />
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

function ListTodoComponent({ username }) {
  return (
    <div className='border'>
      <h3>List Of Todos Component</h3>
      <TodoItemComponent username={username} />
    </div>
  );
}

function TodoItemComponent({ username }) {
  return (
    <div className='border'>
      <h3>Todo Item Component</h3>
      <TodoItemNoteComponent username={username} />
    </div>
  )
}

function TodoItemNoteComponent({ username }) {
  return (
    <div className='border'>
      <h3 >Todo Item Note</h3>
      <span>User: {username}</span>
    </div>
  )
}

export default App;
