import React, { createContext, useState, useContext } from 'react';

// Create a context
const ThemeContext = createContext();

// Create a provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
};

// Themed Component that uses the theme context directly
const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Define styles based on the theme
  const styles = {
    background: theme === 'light' ? '#ffffff' : '#333333', // Light background or dark background
    color: theme === 'light' ? '#000000' : '#ffffff', // Light text or dark text
    height: '100vh', // Full height for the background effect
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.5s, color 0.5s', // Smooth transition for background and text color
  };

  return (
    <div style={styles}>
      <h1>{theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default App;
