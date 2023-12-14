import './App.css';
import React, { useReducer } from 'react';

const initialState = {
  fields: {
    name: '',
    date: '',
  },
  items: [{
    id: 1,
    name: "example",
    date: "2023-12-02", // Add a sample date
  }]
}


const reducer = (state, action) => {
  if (action.type === "updateField") {
    console.log("Update Field");
    return { ...state, fields: { ...state.fields, [action.value.field]: action.value.value } };
  }
  if (action.type === "addItem") {
    console.log("addItem");

    return { ...state, items: [...state.items, { id: state.items.length + 1, ...state.fields }] };
  }

  // Handle unknown actions
  console.warn("Unknown action type:", action.type);
  return state;
};


function App() {
  const [todoState, dispatch] = useReducer(reducer, initialState);
  console.log({ todoState });

  return (
    <div className="App">
      <h1>TODO list app</h1>

      {Object.keys(todoState?.fields || {}).map(key =>
        <input
          key={key}
          placeholder={key}
          onChange={(e) => dispatch({ type: "updateField", value: { field: key, value: e.target.value } })}
          value={todoState.fields[key]}
        ></input>
      )}
      <button onClick={() => dispatch({ type: "addItem" })}>Add</button>

      <h2>Current List</h2>
      {todoState?.items?.map((todoItem) => (
        <div key={todoItem.id}>
          {todoItem.id} - {todoItem.date} - {todoItem.name}
          <button>DELETE Item</button>
        </div>
      ))}
    </div>
  );
}

export default App;
