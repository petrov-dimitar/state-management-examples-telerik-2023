import './App.css';
import react, { useState, useReducer } from 'react';
import { RequirementsList } from './RequirementsList.js';

const initialReducerState = {
  isSubmitting: false,
  userInput: '',
  itemList: [{ id: 1, title: "My first todo" }],
  message: { type: null, value: "" },

}

const delay = ms => new Promise(res => setTimeout(res, ms));
function reducer(state, action) {
  switch (action.type) {
    case 'set_user_input': {
      return {
        ...state,
        userInput: action.value
      };
    }
    case 'set_is_submitting': {
      return {
        ...state,
        isSubmitting: action.value,
        message: { type: action, value: 'Adding the item...' }
      };
    }
    case 'set_message': {
      return {
        ...state,
        message: action.value
      };
    }
    case 'set_item_list': {
      return {
        ...state,
        itemList: [
          ...state.itemList,
          {
            id: [state.itemList.length - 1].id + 1,
            title: action.value
          }
        ]
      }
    }
    default: return state;
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  const { isSubmitting, userInput, itemList, message } = state

  const buttonDisabled = userInput === '' || isSubmitting

  async function addItemHandler() {
    dispatch({ type: "set_is_submitting", value: true })
    dispatch({ type: 'set_message', value: { type: 'submitting', value: 'Adding the item...' } })
    await delay(3000);
    dispatch({ type: "set_is_submitting", value: false })
    if (containsSpecialChars(userInput)) {
      dispatch({ type: 'set_message', value: { type: 'error', value: 'invalid charachter' } })
      //show erorr
      return
    }
    const nextId = itemList[itemList.length - 1].id + 1
    dispatch({ type: 'set_item_list', value: userInput })
    dispatch({ type: 'set_user_input', value: '' });
    dispatch({ type: 'set_message', value: { type: 'success', value: 'Item added' } })
  }


  return (
    <div className="App">
      <RequirementsList />
      <h1>TODO list app</h1>
      <input
        placeholder='Task Title'
        name='title'
        value={userInput}
        onChange={(e) => dispatch({ type: "set_user_input", value: e.target.value })}
      />
      <button disabled={buttonDisabled} onClick={addItemHandler}>Add</button>
      {message.type === 'error' && <div>Error: {message?.value}</div>}
      {message.type === 'success' && <div>Success: {message?.value}</div>}
      {message.type === 'submitting' && <div>Adding item: {message?.value}</div>}

      <ul>
        {itemList.map(el => <li key={el?.id}>{el.id} - {el.title}</li>)}
      </ul>
    </div>
  );
}

// For validation purposes
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export default App;
