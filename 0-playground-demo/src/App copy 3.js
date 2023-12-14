import './App.css';
import React, { useState, useReducer } from 'react';

// Refactor with Reducer

const initialItems = [
  {
    id: 1,
    title: 'My First Todo'
  }
]

const initialReducerState = {
  items: [...initialItems],
  title: "",
  status: null,
  errorMessage: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        status: STATUS_LIST.loading
      }
    }
    case "CHANGE_TITLE": {
      return {
        ...state,
        title: action.value
      }
    }
    case "ADD_TASK_SUCCESS": {
      const items = state.items;
      const nextId = [...items][items.length - 1].id + 1

      return {
        ...state,
        items: [...state.items, { id: nextId, title: action.value }],
        status: STATUS_LIST.success
      }
    }
    case "ADD_TASK_ERROR": {
      return {
        ...state,
        status: STATUS_LIST.error,
        errorMessage: action.value
      }
    }
    default:
      console.log("No such aciton registered")
      return state;
  }
}

function App() {
  const [{ title, status, items, errorMessage }, dispatch] = useReducer(reducer, initialReducerState);

  // Derive state from existing variables
  const empty = title.length === 0;
  const typing = !empty && status !== STATUS_LIST.loading;
  const isDisabled = !typing

  const handleChangeTitle = (value) => {
    dispatch({ type: "CHANGE_TITLE", value: value })
  }

  const handleAddTask = async () => {
    dispatch({ type: "LOADING" })
    try {
      await sendAPIItem({ returnError: true });
      dispatch({ type: "ADD_TASK_SUCCESS", value: title })
    }
    catch (e) {
      dispatch({ type: "ADD_TASK_ERROR", value: e })
    }
  }

  return (
    <div className="App">
      <h1>TODO list app</h1>
      {status === STATUS_LIST.success && <div>Success!</div>}
      {errorMessage && <div>Error!: {errorMessage}</div>}

      <input
        placeholder='Task Title'
        value={title}
        onChange={e => handleChangeTitle(e.target.value)}
      />
      <button onClick={handleAddTask} disabled={isDisabled}>Add Task</button>

      <h3>List of Tasks</h3>
      {items.map(item => <p>{item.id}: {item.title}</p>)}
    </div>
  );
}


const STATUS_LIST = {
  loading: 'loading',
  success: 'success',
  error: 'error'
}

function sendAPIItem({ returnError }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (returnError) {
        reject('Something Went Wrong');
      }
      resolve("Promise resolved!");
    }, 3000);
  });
}

export default App;
