import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [search, setSearch] = useState(false)

  return (
    <div className = "App">
       <div className = "Title">
          <h1>Pokemon Generator</h1>
          <p>by Anderson Hsieh</p>
       </div>
       <div className = "Data">
         
         data display
         <button>

         </button>
       </div>
    </div>
  );
}

export default App;
