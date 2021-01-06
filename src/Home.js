import React, {useState, useEffect, useReducer} from 'react';
import { useMachine } from "react-robot";
import './Home.css';
import { createMachine, state, transition, invoke, reduce } from 'robot3';
const context = () => ({
    users: []
});

async function loadUsers() {
    return [
        { id: 1, name: 'John' },
        { id: 2, name: 'Max' },
        { id: 3, name: 'Anne'}
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

function reducer (state, action) {
    if (action === 'increment') {
        return state + 1
    } else if (action === 'decrement') {
        return state -1
    } else if (action === 'reset') {
        return 0
    } else {
        throw new Error(`This action type is not supported`)
    }
}

function Home() {
    const [current, send] = useMachine(machine);
    const state = current.name;
    const { users } = current.context;
    const disabledButton = state === 'loading' || state === 'loaded';
    const API_KEY = process.env.REACT_APP_API_KEY

    const [count, dispatch] = useReducer(
        reducer,
        0
    )

    const res = useFetch(`https://api.spoonacular.com/food/jokes/random?apiKey=${API_KEY}`, {})
    if (!res.response) {
        return <div>Loading...</div>
    }
    const data = res.response

    return (
        <div className="Home">
            <h2>{count}</h2>
            <button onClick={() => dispatch('increment')}>plus</button>
            <button onClick={() => dispatch('decrement')}>minus</button>
            <button onClick={() => dispatch('reset')}>minus</button>
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
