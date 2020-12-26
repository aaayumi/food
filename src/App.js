import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Search from './Search';
import Home from './Home';
import './App.css';

function App() {
  return (
<Router>
    <div>
        <nav>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/search"}>Search</Link>
                </li>
            </ul>
        </nav>

        <Switch>
            <Route path={"/search"}>
                <Search />
            </Route>
            <Route path={"/"}>
                <Home />
            </Route>
        </Switch>
    </div>
</Router>
  );
}

export default App;
