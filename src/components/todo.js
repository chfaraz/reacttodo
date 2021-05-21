import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';

const Todo = ({ remove, title, description, edit, completed, _id, checked, editId }) => {
    return (
        <Card className="card">
            <div className="inerdiv">
                <Checkbox onChange={(e) => completed(_id, e.target.checked, title, description)} checked={checked} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />
                <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </div>
            <CardActions>
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        editId(_id);
                        edit(true);
                    }}
                >
                    <EditIcon style={{ color: 'black' }} />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => remove(_id)}>
                    <DeleteForeverIcon style={{ color: 'red' }} />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Todo;
