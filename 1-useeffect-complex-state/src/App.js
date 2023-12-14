import './App.css';
import react, { useState } from 'react';
import { RequirementsList } from './RequirementsList.js';

// 1. Identify your component’s different visual states (vs)
// 2. Determine what triggers those transitions from one vs to another
// all - show items, iput, add button
// empty state - empty input, disabled add option 
// typing state - input has value, enabled button (human input)
// submitting state - disable add, send request (human input), show spinner
// success state - update list + success emssage, clear input (network)
// error state - dont update list, dont clear input, show error message (network)

function App() {
  // 3. Represent the state in memory using useState
  // 4. Remove any non - essential state variables
  const [itemList, setItemList] = useState([{ id: 1, title: "My first todo" }])
  const [userInput, setUserInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: null, value: "" });

  const buttonDisabled = userInput === '' || isSubmitting

  // 5. Connect the event handlers to set the state
  async function addItemHandler() {
    setIsSubmitting(true);
    setMessage({ type: 'submitting', value: 'Adding the item...' })
    await delay(3000);
    setIsSubmitting(false);
    if (containsSpecialChars(userInput)) {
      //show erorr
      setMessage({ type: 'error', value: 'invalid charachter' })
      return
    }

    const nextId = itemList[itemList.length - 1].id + 1
    setItemList([...itemList, { id: nextId, title: userInput }])
    setUserInput("")
    setMessage({ type: 'success', value: 'Item added' })
  }

  return (
    <div className="App">
      <RequirementsList />
      <h1>TODO list app</h1>
      <input
        placeholder='Task Title'
        name='title'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button disabled={buttonDisabled} onClick={addItemHandler}>Add</button>
      {message.type === 'error' && <div>Error: {message.value}</div>}
      {message.type === 'success' && <div>Success: {message.value}</div>}
      {message.type === 'submitting' && <div>Adding item: {message.value}</div>}

      <ul>
        {itemList.map(el => <li key={el?.id}>{el.id} - {el.title}</li>)}
      </ul>
    </div>
  );
}

// Mock call to a back-end
const delay = ms => new Promise(res => setTimeout(res, ms));

// For validation purposes
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export default App;
