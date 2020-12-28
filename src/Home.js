import React, {useState, useEffect} from 'react';
import './App.css';

const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    useEffect( async() => {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
    }, []);
    return { response }
};

function Home() {
    const API_KEY = process.env.REACT_APP_API_KEY

    const res = useFetch(`https://api.spoonacular.com/food/jokes/random?apiKey=${API_KEY}`, {})
    if (!res.response) {
        return <div>Loading...</div>
    }
    const data = res.response
    return (
        <div className="Home">
             <h2>{data.text}</h2>
        </div>
    );
}

export default Home;
