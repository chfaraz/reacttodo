import './App.css';
import Header from './components/header';
import Todos from './containers/todos';

import { useState } from 'react';
import AddTodo from './containers/addTodo';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Signup from './containers/signup';
import Signin from './containers/login';

function App() {
    const [state, setState] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <div className="App">
                <Header state={state} setState={setState} />

                <Switch>
                    <Route exact path="/">
                        <Signin setState={setState} />
                    </Route>
                    <Route exact path="/signup">
                        <Signup setState={setState} />
                    </Route>
                    <Route exact path="/todos">
                        <Todos />
                    </Route>
                    <Route exact path="/addtodo">
                        <AddTodo />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
