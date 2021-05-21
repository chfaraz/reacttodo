import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from '../components/todo';
import { url } from '../constants';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import EditTodo from './editTodo';

const Todos = () => {
    const [state, setstate] = useState([]);
    const [counter, setCounter] = useState(0);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        async function getTodos() {
            try {
                const response = await axios.get(url + `todos/${user}`, { headers: { Authorization: `Basic ${token}` } });
                setstate(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getTodos();
    }, [counter]);

    const remove = (id) => {
        const token = localStorage.getItem('token');

        console.log(id);
        axios
            .delete(url + `todos/${id}`, { headers: { Authorization: `Basic ${token}` } })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        setCounter(counter + 1);
    };

    const completed = (id, checked, title, desc) => {
        const token = localStorage.getItem('token');

        axios
            .patch(
                url + `todos/${id}`,
                {
                    title: title,
                    description: desc,
                    completed: checked,
                },
                { headers: { Authorization: `Basic ${token}` } }
            )
            .then(function (response) {
                console.log(response);
                setCounter(counter + 1);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div>
            {state.map((i) => (
                <Todo title={i.title} description={i.description} key={i._id} remove={remove} _id={i._id} completed={completed} checked={i.completed} edit={setEdit} editId={setEditId} />
            ))}
            {edit ? <EditTodo edit={setEdit} editId={editId} setCounter={setCounter} counter={counter} /> : null}
            <div className="add-button">
                <Link to="addtodo">
                    <Button variant="contained">Add Todo</Button>
                </Link>
                {/* <Button variant="contained" onClick={() => settodo(!todo)}>
                        Todos
                    </Button> */}
            </div>
        </div>
    );
};

export default Todos;
