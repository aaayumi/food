import React, {useState, useEffect, useReducer} from 'react';
import { useMachine } from "react-robot";
import useClippy from "use-clippy";
import './Home.css';
import { createMachine, state, transition, invoke, reduce } from 'robot3';
import { useMobileWindow } from "./mobileWindow"
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
    const onSmallScreen = useMobileWindow(); // custom hook
    const [clipboard, setClipboard] = useClippy(); // crippy library
    const [current, send] = useMachine(machine);
    const state = current.name;
    const {users} = current.context;
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

    //map
    const number = [1, 2, 3, 4]
    const map = number.map(number => number + 5)
    console.log('map', map)

    //filter
    const member = [
        {id: 1, age: 30},
        {id: 2, age: 10},
        {id: 3, age: 40},
        {id: 4, age: 22},
        {id: 5, age: 68},
    ]

    const filter = member.filter(mem => mem.age > 40 && [...member])

    console.log('filter', filter)

    //reduce
    const character = ['a', 'b', 'c', 'd', 'a', 'b', 'b'];
    const makeCount = character.reduce((obj, count) =>{
    if (!obj[count])
    {
        obj[count] = 1;
    }
else
    {
        obj[count]++;
    }
    return obj;
   }, {});

    console.log('reduce', makeCount)
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

            <button
                onClick={()=> {
                    alert(`Your clipboard contains ${clipboard}`);
                }}>
                Read my clipboard
            </button>

            <button
                onClick={() => {
                    setClipboard(`Random number: ${Math.random()}`);
                }}
                >
                Copy something new
            </button>
        </div>
    );
}

export default Home;
