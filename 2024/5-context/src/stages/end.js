import './App.css';
import React, { createContext, useState, useContext } from 'react';

const userContext = createContext()

function App() {
  const [username, setUsername] = useState('gorg2213')

  return (
    <userContext.Provider value={{ username, setUsername }}>
      <div className="App border">
        <h3>App Component</h3>
        <AddTodoComponent />
        <ListTodoComponent />
      </div>
    </userContext.Provider>
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
  const { username } = useContext(userContext)
  return (
    <div className='border'>
      <h3 >Todo Item Note</h3>
      <span>User: {username}</span>
    </div>
  )
}

export default App;
