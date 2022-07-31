import { Container, Grow, Grid, AppBar, Paper, TextField, Button, Typography  } from "@material-ui/core";
import React, { useState } from 'react';
import Posts from '../Posts/Posts';
import { getPostsBySearch } from '../../actions/posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from "react-router-dom";
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
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        //
    }

    const handleAdd = (tag) => {
        return setTags([...tags, tag]);
    }

    const handleDelete = (tag) => {
        return setTags(tags.filter(t => t !== tag));
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));    
        }else{
            history('/');
        }
    }

    return (    
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                    { user && (
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
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                            />
                            <Button type="submit" variant="contained" color="primary" onClick={searchPost}>Search</Button>
                        </AppBar>
                    ) }
                    <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        { user ? (
                          <Form currentId={currentId} setCurrentId={setCurrentId} />  
                        ) : (
                            <Paper className={classes.paper}>
                                <Typography variant="h6" align="center">
                                    Please Sign in to Create your own memories and like other's memories
                                </Typography>
                            </Paper>
                        ) }
                        {(!searchQuery && !tags.length && user) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;