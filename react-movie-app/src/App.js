import logo from './logo.svg';
import './App.css';
import Homepage from './pages/homepage';
import ThemeButton from './components/theme-button';
import { createContext, useState } from 'react';

//create context
//provide context
//consume context

export const ThemeContext = createContext(null) ;

function App() {
  const[theme,setTheme] = useState(false);
  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme
    }} >
      <div style={theme ? {backgroundColor:"#feb300"}:{}} className="App">
        <ThemeButton />
        <Homepage />
      </div>
    </ThemeContext.Provider>

  );
}

export default App;
