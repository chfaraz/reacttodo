import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import { url } from '../constants';

import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    let history = useHistory();

    const signup = () => {
        if (name !== '' && userName !== '' && password !== '') {
            axios
                .post(url + 'user/signup', {
                    name: name,
                    userName: userName,
                    password: password,
                })
                .then(function (response) {
                    console.log(response);
                    axios
                        .post(url + 'user/login', {
                            userName: userName,
                            password: password,
                        })
                        .then(function (response) {
                            console.log(response);
                            localStorage.setItem('user', response.data.userName);
                            localStorage.setItem('token', response.data.token);
                            history.push('/todos');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
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
                <TextField id="outlined-basic" label="Name" variant="outlined" className="title" fullWidth onChange={(e) => setName(e.target.value)} error={error ? 'add title' : null} value={name} />
                <TextField id="outlined-multiline-static" label="User Name" fullWidth className="title" variant="outlined" onChange={(e) => setUserName(e.target.value)} error={error ? 'add description' : null} value={userName} />

                <TextField id="outlined-multiline-static" label="Password" fullWidth className="title" variant="outlined" onChange={(e) => setPassword(e.target.value)} error={error ? 'add description' : null} value={password} />

                <div className="add-todo">
                    <Button variant="contained" color="primary" onClick={signup}>
                        Sign Up
                    </Button>
                    <Button variant="contained">
                        <Link to="/">Sign In</Link>
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Signup;
