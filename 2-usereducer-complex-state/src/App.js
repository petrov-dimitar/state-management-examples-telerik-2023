// Good Read: https://react.dev/learn/extracting-state-logic-into-a-reducer

import './App.css';
import React, { useReducer } from 'react';
import { RequirementsList } from './RequirementsList.js';

function App() {
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  const { isSubmitting, userInput, itemList, message } = state;

  const buttonDisabled = userInput === '' || isSubmitting;

  async function addItemHandler() {
    dispatch({ type: ActionTypes.SET_IS_SUBMITTING, value: true });
    dispatch({ type: ActionTypes.SET_MESSAGE, value: { type: 'submitting', value: 'Adding the item...' } });

    // Await the request to the back-end
    await delay(3000);

    dispatch({ type: ActionTypes.SET_IS_SUBMITTING, value: false });
    if (containsSpecialChars(userInput)) {
      dispatch({ type: ActionTypes.SET_MESSAGE, value: { type: 'error', value: 'Invalid character' } });
      //show error
      return;
    }

    // No error - proceed with adding the item
    dispatch({ type: ActionTypes.SET_ITEM_LIST, value: userInput });
    dispatch({ type: ActionTypes.SET_USER_INPUT, value: '' });
    dispatch({ type: ActionTypes.SET_MESSAGE, value: { type: 'success', value: 'Item added' } });
  }

  return (
    <div className="App">
      <RequirementsList />
      <h1>TODO list app</h1>
      <input
        placeholder='Task Title'
        name='title'
        value={userInput}
        onChange={(e) => dispatch({ type: ActionTypes.SET_USER_INPUT, value: e.target.value })}
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

// All code below will normally go intro seperate file/s
// Mock call to an api
const delay = ms => new Promise(res => setTimeout(res, ms));

// For validation purposes
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

// Optional - use enum when dispatching actions for intelisense and avoid syntax errors
const ActionTypes = {
  SET_USER_INPUT: 'set_user_input',
  SET_IS_SUBMITTING: 'set_is_submitting',
  SET_MESSAGE: 'set_message',
  SET_ITEM_LIST: 'set_item_list',
};

// Optional - add initial state for our reducer
const initialReducerState = {
  isSubmitting: false,
  userInput: '',
  itemList: [{ id: 1, title: "My first todo" }],
  message: { type: null, value: "" },
};

// Our Reducer function. Recieves the whole state as first parameter
// and the action object as second parameter
// action object is unopinionated. You can pass whatever you want.
//  In our case we have standartized it to action - {type: <ActionTypes>, value: any }
function reducer(state, action) {
  switch (action.type) {
    // Reducers actions must be pure. No network calls allowed here.
    // At the end we return how the final state looks after perfroming each of the actions.
    case ActionTypes.SET_USER_INPUT:
      return {
        ...state,
        userInput: action.value,
      };
    case ActionTypes.SET_IS_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.value,
        message: { type: ActionTypes.SET_IS_SUBMITTING, value: 'Adding the item...' },
      };
    case ActionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.value,
      };
    case ActionTypes.SET_ITEM_LIST:
      return {
        ...state,
        itemList: [
          ...state.itemList,
          {
            id: state.itemList[state.itemList.length - 1].id + 1,
            title: action.value,
          },
        ],
      };
    default:
      return state;
  }
}

export default App;

