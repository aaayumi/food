import React, {useState, useEffect} from 'react';
import { useMachine } from "react-robot";
import './Home.css';
import { createMachine, state, transition, invoke, reduce } from 'robot3';
const context = () => ({
    users: []
});

async function loadUsers() {
    return [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three'}
    ];
}
const machine = createMachine({
    idle: state(
        transition('fetch', 'loading')
    ),
    loading: invoke(loadUsers,
        transition('done', 'loaded',
            reduce((ctx, ev) => ({ ...ctx, users: ev.data }))
        )
    ),
    loaded: state()
}, context)

const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    useEffect( () => {
        async function fetchAPI () {
            const res = await fetch(url, options);
            const json = await res.json();
            setResponse(json);
        }
        fetchAPI()
    }, []);
    return { response }
};

function Home() {
    const [current, send] = useMachine(machine);
    const state = current.name;
    const { users } = current.context;
    const disabledButton = state === 'loading' || state === 'loaded';
    const API_KEY = process.env.REACT_APP_API_KEY

    const res = useFetch(`https://api.spoonacular.com/food/jokes/random?apiKey=${API_KEY}`, {})
    if (!res.response) {
        return <div>Loading...</div>
    }
    const data = res.response
    return (
        <div className="Home">
             <h2>{data.text}</h2>
            {state === 'loading' ? (
                <div>Loading users...</div>
            ) : state === 'loaded' ? (

                <ul>
                    {users.map(user => <li key={user.id}
                                           id={`user-${user.id}`}
                        >{user.name}</li>
                    )}
                </ul>

            ): <div></div>}
            <button onClick={() => send('fetch')} disabled={disabledButton}>
                Load users
            </button>
        </div>
    );
}

export default Home;
