import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{
      display: 'flex',
      justifyContent: "space-between"
    }}>

      <App />
      <Requirements />
    </div>
  </React.StrictMode>
);

function Requirements() {
  return <div
    style={{
      width: "300px"
    }}
  >
    Requirements:
    <ul>
      <li>Show tasks in a list</li>
      <li>Create input where you will add task title</li>
      <li>Add button that will add new todo item in the list based on input like `id, title`</li>
      <li>At empty input disable button</li>
      <li>When typing in the input box enable button</li>
      <li>Show success message when task is added to list</li>
      <li>Clear input when task is added successfully</li>
      <li>Show error message when add is initiated but failed</li>
      <li>Don't clear input when adding failed due to error</li>


    </ul>

  </div>
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
