import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import { url } from '../constants';

import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Signin = ({ setState }) => {
    let history = useHistory();
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const login = () => {
        if (userName !== '' && password !== '') {
            axios
                .post(url + 'user/login', {
                    userName: userName,
                    password: password,
                })
                .then(function (response) {
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', response.data.userName);
                    history.push('/todos');
                    setState(localStorage.getItem('token'));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setError(true);
        }
    };

    return (
        <Card className="card">
            <form className="form" noValidate autoComplete="off">
                <TextField id="outlined-multiline-static" label="User Name" fullWidth className="title" variant="outlined" onChange={(e) => setUserName(e.target.value)} error={error ? 'add description' : null} value={userName} />

                <TextField id="outlined-multiline-static" label="Password" fullWidth className="title" variant="outlined" onChange={(e) => setPassword(e.target.value)} error={error ? 'add description' : null} value={password} />

                <div className="add-todo">
                    <Button variant="contained" color="primary" onClick={login}>
                        Sign In
                    </Button>
                    <Link to="/signup">
                        <Button variant="contained">Sign Up</Button>
                    </Link>
                </div>
            </form>
        </Card>
    );
};

export default Signin;
