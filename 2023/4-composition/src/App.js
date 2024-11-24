import './App.css';
import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState("george89")
  return (
    <div className="App border">
      <h3>App Component</h3>
      <AddTodoComponent />
      <ListTodoComponent>
        <TodoItemComponent>
          <TodoItemNoteComponent username={username} />
        </TodoItemComponent>
      </ListTodoComponent>
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

function ListTodoComponent({ children }) {
  return (
    <div className='border'>
      <h3>List Of Todos Component</h3>
      {children}
      {/* <TodoItemComponent /> */}
    </div>
  );
}

function TodoItemComponent({ children }) {
  return (
    <div className='border'>
      <h3>Todo Item Component</h3>
      {children}
      {/* <TodoItemNoteComponent /> */}
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
