import { Container, Grow, Grid, AppBar, Paper, TextField, Button  } from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';
import { getPosts } from '../../actions/posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { useHistory,useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId,dispatch]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //Search for the Post
        }
    }

    return (    
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                        name="search" 
                        variant="outlined" 
                        label="search Memories"
                        onKeyPress={handleKeyPress}
                        fullWidth
                        value={search}
                        onChange={ (e) => setSearch(e.target.value) } 
                        />
                        <ChipInput 
                            style={{margin: '10px 0'}}
                            value={tags}
                        />
                    </AppBar>
                    <Grid item xs={12} sm={6} md={3}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;