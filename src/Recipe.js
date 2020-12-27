import React, { useState, useEffect } from 'react';
import './App.css';

function Recipe() {
    const [data, setData] = useState();
    const API_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        let mounted = true;
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`)
            .then( data => data.json())
            .then(item => {
                if(mounted) {
                    setData(item.recipes[0])
                }
            })
        return () => mounted = false;
    }, [])

    return (
        <div className="App">

            {data &&
            <div>
                <h2>{data.title}</h2>
                <img src={data.image} />
                <h3>How to prepare</h3>
                {data.analyzedInstructions[0].steps.map((recipe, i) =>
                <li key={i}>{recipe.step}</li>)}
            </div>
            }
        </div>
    );
}

export default Recipe;