import React, { useState, useEffect } from 'react';
import './App.css';

function Search() {
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const API_KEY = process.env.REACT_APP_API_KEY


    // useEffect(() => {
    //   let mounted = true;
    //   fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=apple`)
    //       .then( data => data.json())
    //       .then(item => {
    //         if(mounted) {
    //           setData(item)
    //         }
    //       })
    //   return () => mounted = false;
    // }, [])



    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=${search}`)
            .then(data => data.json())
            .then(item => {
                setData(item)
            })
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type={`text`} onChange={(e) => setSearch(e.target.value)} />
            </form>

            {data &&
            data.results.map((result, i) =>
                <li key={i}>{result.name}</li>)
            }
        </div>
    );
}

export default Search;
