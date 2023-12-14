import './App.css';
import React from 'react';

function App() {
  const data = "Hello from App Component";

  return (
    <Header data={data} />
  );
}

// Intermediate component
function Header({ data }) {
  return (
    <div className='border'>
      <h1>{data}</h1>
      <SubHeader data={data} />
    </div>
  );
}

// Lower-level component
function SubHeader({ data }) {
  return (
    <div className='border'>
      <h2>{data}</h2>
    </div>);
}

export default App;

