import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY

  useEffect(() => {
    let mounted = true;
    fetch('https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=apple')
        .then( data => data.json())
        .then(item => {
          if(mounted) {
            setData(item)
          }
        })
    return () => mounted = false;
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
