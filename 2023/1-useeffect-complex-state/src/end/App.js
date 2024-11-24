import './App.css';
import react, { useState } from 'react';

// 1. Identify your component’s different visual states
// - all visual states - show available list items and current input
// - empty - disable add task button; 
// - typing - enable button, show typed value in textbox - user input
// - submitting/loading - disable button, clear textfield, send data (if making network call) - user input
// - success - clear input, disable button, add to list - network response
// - error - show error message - network response

// 2. Determine what triggers those state changes
// 3. Represent the state in memory using useState
// 4. Remove any non - essential state variables
// 5. Connect the event handlers to set the state

function App() {
  const [items, setItems] = useState(initialItems)
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null)

  // Derive state from existing variables
  const empty = title.length === 0;
  const typing = !empty && status !== STATUS_LIST.loading;
  const isDisabled = !typing

  const handleChangeTitle = (value) => {
    setTitle(value);
  }

  const handleAddTask = async () => {
    setStatus(STATUS_LIST.loading);

    // Make call to mock api
    try {
      await sendAPIItem({ returnError: false });

      const nextId = [...items][items.length - 1].id + 1

      setItems([...items, { id: nextId, title: title }]);
      setStatus(STATUS_LIST.success);
      setTitle("");
    }
    catch (e) {
      setErrorMessage(e)
    }
  }

  return (
    <div className="App">
      {status === STATUS_LIST.success && <div>Success!</div>}
      {errorMessage && <div>Error!: {errorMessage}</div>}

      <h1>TODO list app</h1>

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

const initialItems = [
  {
    id: 1,
    title: 'My First Todo'
  }
]

const STATUS_LIST = {
  loading: 'loading',
  success: 'success',
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
