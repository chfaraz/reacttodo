import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import { url } from '../constants';

import axios from 'axios';

const EditTodo = ({ edit, editId, setCounter, counter }) => {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [error, setError] = React.useState(false);
    const token = localStorage.getItem('token');
    useEffect(() => {
        async function getTodos() {
            try {
                const response = await axios.get(url + `todos/todo/${editId}`, { headers: { Authorization: `Basic ${token}` } });
                console.log(response);
                setTitle(response.data.title);
                setDesc(response.data.description);
            } catch (error) {
                console.error(error);
            }
        }
        getTodos();
    }, []);
    const editTodo = () => {
        if (title !== '' && desc !== '') {
            axios
                .patch(
                    url + `todos/${editId}`,
                    {
                        title: title,
                        description: desc,
                    },
                    { headers: { Authorization: `Basic ${token}` } }
                )
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setError(true);
        }
        edit(false);
        setCounter(counter + 1);
    };
    return (
        <Card className="card edit">
            <form className="form" noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Title" variant="outlined" className="title" fullWidth onChange={(e) => setTitle(e.target.value)} error={error ? 'add title' : null} value={title} />
                <TextField id="outlined-multiline-static" label="Description" multiline rows={4} fullWidth className="title" variant="outlined" onChange={(e) => setDesc(e.target.value)} error={error ? 'add description' : null} value={desc} />
                <div className="add-todo">
                    <Button variant="contained" color="primary" onClick={editTodo}>
                        Done
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => edit(false)}>
                        Close
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default EditTodo;
