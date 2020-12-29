import React, { useState, useEffect } from 'react';
import './Search.css';

function Search() {
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const API_KEY = process.env.REACT_APP_API_KEY

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=${search}`)
            .then(data => data.json())
            .then(item => {
                setData(item)
            })
    }

    return (
        <div className="Search">
            <form onSubmit={handleSubmit}>
                <h2>Get inspiration! Type an ingredient.</h2>
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
