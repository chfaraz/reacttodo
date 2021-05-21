import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { url } from '../constants';
import { Link } from 'react-router-dom';

import axios from 'axios';

const AddTodo = () => {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [error, setError] = React.useState(false);
    const addTodo = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        console.log(token);
        if (title !== '' && desc !== '') {
            try {
                axios
                    .post(
                        url + 'todos',
                        {
                            title: title,
                            description: desc,
                            userName: user,
                        },
                        { headers: { Authorization: `Basic ${token}` } }
                    )
                    .then(function (response) {
                        console.log(response);
                        setDesc('');
                        setTitle('');
                        setError(false);
                    })
                    .catch(function (error) {
                        console.log(error.response.request._response);
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            setError(true);
        }
    };

    return (
        <>
            <Card className="card">
                <form className="form" noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Title" variant="outlined" className="title" fullWidth onChange={(e) => setTitle(e.target.value)} error={error ? 'add title' : null} value={title} />
                    <TextField id="outlined-multiline-static" label="Description" multiline rows={4} fullWidth className="title" variant="outlined" onChange={(e) => setDesc(e.target.value)} error={error ? 'add description' : null} value={desc} />
                    <div className="add-todo">
                        <Button variant="contained" color="primary" onClick={addTodo}>
                            Add Todo
                        </Button>
                    </div>
                </form>
            </Card>
            <div className="back-buton">
                <Link to="/todos">
                    <Button variant="contained" color="secondary">
                        <ArrowBackIcon style={{ color: 'white' }} />
                        Todos
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default AddTodo;
