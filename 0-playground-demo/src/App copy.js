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

const initialItems = [
  {
    id: 1,
    title: 'My First Todo'
  }
]

function App() {
  const [items, setItems] = useState(initialItems)
  const [title, setTitle] = useState("")

  const [empty, setEmpty] = useState(true);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeTitle = (value) => {
    setSuccess(false);
    setTitle(value);
    if (value === "") {
      console.log({ value })
      setEmpty(true);
      return;
    }
    setTyping(true);
    setEmpty(false);
  }

  const handleAddTask = () => {
    if (title === "error") {
      setError(true);
      setSuccess(false);
      return;
    }
    setLoading(true);
    setItems([...items, { id: [...items][items.length - 1].id + 1, title: title }]);
    setLoading(false);
    setSuccess(true);
    setTitle("");
    setEmpty(true);
    setError(false);
  }

  return (
    <div className="App">
      {success && <div>Success!</div>}
      {error && <div>Error!</div>}

      <h1>TODO list app</h1>

      <input
        placeholder='Task Title'
        value={title}
        onChange={e => handleChangeTitle(e.target.value)}
      />
      <button onClick={handleAddTask} disabled={empty || !typing || loading}>Add Task</button>

      <h3>List of Tasks</h3>
      {items.map(item => <p>{item.id}: {item.title}</p>)}
    </div>
  );
}

// Mock function API call
// function submitForm(data, shouldError = false) {
//   // Pretend it's hitting the network.
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldError) {
//         reject(new Error('Something Went Wrong'));
//       } else {
//         resolve();
//       }
//     }, 1500);
//   });
// }

export default App;
