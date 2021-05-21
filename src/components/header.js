import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link, useHistory } from 'react-router-dom';

const Header = ({ state, setState }) => {
    let history = useHistory();
    useEffect(() => {
        console.log(state);
    }, [state]);
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/');
        setState(localStorage.getItem('token'));
    };
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" className="center-v">
                    Todo List
                </Typography>
                {state === null ? null : (
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
