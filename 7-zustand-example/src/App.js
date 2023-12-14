import logo from './logo.svg';
import './App.css';

// Import the create function from Zustand
import create from 'zustand';

// Create a Zustand store
const useStore = create((set) => ({
  // Define state variables
  username: 'george89',

  // Define actions to update state
  setUsername: (newUsername) => set({ username: newUsername }),
}));

// Component using the Zustand store
function ExampleComponent() {
  // Use the store hook to access state and actions
  const { username, setUsername } = useStore();

  return (
    <div>
      <h1>User: {username}</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
}

// Another component using the same Zustand store
function AnotherComponent() {
  const { username } = useStore();

  return (
    <div>
      <h2>Another Component</h2>
      <p>User from store: {username}</p>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <ExampleComponent />
      <AnotherComponent />
    </div>
  );
}

export default App;
