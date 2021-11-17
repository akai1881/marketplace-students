import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    makeStyles,
    Paper,
    Radio,
    Slider,
    RadioGroup,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useProducts } from '../../contexts/ProductsContext';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 300,
        padding: theme.spacing(3),
    },
}));

const Sidebar = () => {
    const classes = useStyles();
    const [slider, setSlider] = useState([200, 20000]);

    const { fetchByParams } = useProducts();

    const handleSlider = (e, value) => {
        setSlider(value);
        fetchByParams('price_lte', value);
    };

    return (
        <Grid item md={3}>
            <Paper className={classes.root}>
                <Grid>
                    <FormControl component="fieldset">
                        <FormLabel component="label">Memory</FormLabel>
                        <RadioGroup
                            aria-label="memory"
                            name="memory1"
                            onChange={(e) => fetchByParams('category', e.target.value)}
                        >
                            <FormControlLabel value="64" control={<Radio />} label="64" />
                            <FormControlLabel value="128" control={<Radio />} label="128" />
                            <FormControlLabel value="256" control={<Radio />} label="256" />
                            <FormControlLabel value="512" control={<Radio />} label="512" />
                            <FormControlLabel value="1024" control={<Radio />} label="1024" />
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl component="fieldset">
                        <FormLabel component="label">Price</FormLabel>
                        <RadioGroup
                            aria-label="price"
                            name="price1"
                            onChange={(e) => fetchByParams('price_lte', e.target.value)}
                        >
                            <FormControlLabel value="1000" control={<Radio />} label="до 1000" />
                            <FormControlLabel value="2000" control={<Radio />} label="до 2000" />
                            <FormControlLabel value="5000" control={<Radio />} label="до 5000" />
                            <FormControlLabel value="10000" control={<Radio />} label="до 10000" />
                            <FormControlLabel value="15000" control={<Radio />} label="до 15000" />
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid>
                    <Slider
                        min={200}
                        max={20000}
                        value={slider}
                        onChange={handleSlider}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    />
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Sidebar;
