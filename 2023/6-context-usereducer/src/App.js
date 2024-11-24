import './App.css';
import React, { createContext, useReducer, useContext } from 'react';

const userContext = createContext()

function reducer(state, action) {
  if (action.name === "set_username") {
    return { ...state, username: action.value }
  }
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, { username: 'geofskld' })

  return (
    <userContext.Provider value={{ state, dispatch }}>
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
  const { state: { username }, dispatch } = useContext(userContext)
  return (
    <div className='border'>
      <h3 >Todo Item Note</h3>
      <input value={username} onChange={e => dispatch({ name: 'set_username', value: e.target.value })} />
      <span>User: {username}</span>
    </div>
  )
}

export default App;
