import './App.css';
import react, { useState } from 'react';

// 1. Identify your component’s different visual states
// 2. Determine what triggers those state changes
// 3. Represent the state in memory using useState
// 4. Remove any non - essential state variables
// 5. Connect the event handlers to set the state

function App() {
  return (
    <div className="App">
      <h1>TODO list app</h1>

      <input
        placeholder='Task Title'
      />
    </div>
  );
}

export default App;
