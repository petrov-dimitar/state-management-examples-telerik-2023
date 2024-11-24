import './App.css';
import react, { useState } from 'react';


function App() {

  const [fields, setField] = useState({
    name: '',
    date: '',
  });

  const handleUpdateField = (fieldName, value) => {
    setField({ ...fields, [fieldName]: value })
  }

  const [items, setItems] = useState([{
    id: 1,
    name: "example"
  }]);


  const handleAddItem = () => {
    setItems([...items, { ...fields }])
    setField({
      name: '',
      date: '',
    })
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => +item.id !== + id));
  }

  return (
    <div className="App">
      <h1>TODO list app</h1>


      {Object.keys(fields).map(key =>
        <input placeholder={key}
          onChange={(e) => handleUpdateField(key, e.target.value)}
          value={fields[key]}
        ></input>
      )}
      <button onClick={handleAddItem}>Add</button>


      <h2>Current List</h2>
      {items.map((todoItem) => {
        return <div key={todoItem.id}>{todoItem.id}{todoItem.date} - {todoItem.name}<button onClick={() => handleDeleteItem(todoItem.id)}>DELETE Item</button></div>
      })}
    </div>
  );
}

export default App;
