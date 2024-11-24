import './App.css';
import React, { createContext, useContext, useReducer } from 'react';

const userContext = createContext()

const initialState = {
  username: "george2123"
}

function reducer(state, action) {
  if (action.type === "UPDATE_USERNAME") {
    return ({ ...state, username: action.value });
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <div className="App border">
        <h3>App Component</h3>
        <AddTodo />
        <ListTodo />
      </div>
    </userContext.Provider>
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
  const { state, dispatch } = useContext(userContext);
  return (
    <div className='border'>
      <h3>Todo Item Component</h3>
      <input value={state.username} onChange={e => dispatch({ type: "UPDATE_USERNAME", value: e.target.value })} />
      <TodoItemNote />
    </div>
  )
}

function TodoItemNote() {
  const { state } = useContext(userContext)
  return (
    <div className='border'>
      <h3 >Todo Item Note</h3>
      <span>User: {state.username}</span>
    </div>
  )
}

export default App;
