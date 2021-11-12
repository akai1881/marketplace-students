import { Grid, Paper, makeStyles } from '@material-ui/core';
import React from 'react';
import ProductsList from '../Products/ProductsList';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    }
}))

const Content = () => {
    const classes = useStyles();

    return (
        <Grid item md={9}>
            <Paper className={classes.paper}>
                <ProductsList />
            </Paper>
        </Grid>
    );
};

export default Content;