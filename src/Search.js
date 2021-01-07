import React, { useState, useRef } from 'react';
import SearchInput from "./SearchInput";
import './Search.css';

function Search() {
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const [message, setMessage] = useState();
    const API_KEY = process.env.REACT_APP_API_KEY
    const textInputRef = useRef(null);
    const sentMessage = useRef(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        textInputRef.current.focus();
        fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=${search}`)
            .then(data => data.json())
            .then(item => {
                setData(item)
            })
    }

    const sendMessage = () => {
        if(sentMessage.current === 3) {
            return alert("Message limit reached")
        }

        sentMessage.current +=1
    }

    const handleChange = (data) => {
        setSearch(data)
    }

    return (
        <div className="Search">
            <form onSubmit={handleSubmit}>
                <h2>Get inspiration! Type an ingredient.</h2>
                <SearchInput ref={textInputRef}
                             searchChange={handleChange} />
            </form>

            <div className="result">
                {data &&
                data.results.map((result, i) =>
                    <li key={i}>{result.name}</li>)
                }
            </div>
            <input onChange={(e)=> setMessage(e.target.value)}
                   value={message} />
                   <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Search;
