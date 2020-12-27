import React, {useState, useEffect} from 'react';
import './App.css';

function Home() {
    const [data, setData] = useState();
    const API_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        let mounted = true;
        fetch(`https://api.spoonacular.com/food/jokes/random?apiKey=${API_KEY}`)
            .then( data => data.json())
            .then( item => setData(item))
        return () => mounted = false;
    }, [])
    return (
        <div className="Home">
            {data &&<h2>{data.text}</h2>}
        </div>
    );
}

export default Home;
