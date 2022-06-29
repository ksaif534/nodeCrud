import React from 'react';
import Post from './Post/Post';
import useStyles from "../../styles";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from '@material-ui/core';

const Posts = ({setCurrentId}) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    // eslint-disable-next-line
    const classes = useStyles();
    console.log({posts, isLoading});
    if (!posts?.length && !isLoading) {
        return 'No posts';
    }
    return (
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) =>(
                        <Grid key={post?._id || 1} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;