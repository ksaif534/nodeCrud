import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import useStyles from './styles';
import { createPost,updatePost } from "../../actions/posts";
import { useNavigate } from 'react-router-dom';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
       title: '',
       message: '',
       tags: '',
       selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId === null) {
            dispatch(createPost({ ...postData, name: user?.result?.name },navigate));
        } else {
            console.log(currentId);
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));    
        }
        clear();
    }
    if (user?.googleToken) {
        if (!user?.googleToken?.name) {
            return (
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">
                        Please Sign in to Create your own Posts and like other's Posts
                    </Typography>
                </Paper>
            )
        }    
    }
    if (user?.result) {
        if (!user?.result?.name) {
            return (
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">
                        Please Sign in to Create your own Posts and like other's Posts
                    </Typography>
                </Paper>
            )
        }
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }
    return (
        <Paper className={classes.paper} elevation={6} style={{ borderRadius: '20px' }}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a Post</Typography>
                <TextField
                    name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({
                    ...postData,
                    title: e.target.value
                })}
                />
                <TextField
                    name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({
                    ...postData,
                    message: e.target.value
                })}
                />
                <TextField
                    name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({
                    ...postData,
                    tags: e.target.value.split(',')
                })}
                />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64})=> setPostData({ ...postData, selectedFile: base64 })}
                    />
                    <Button className={classes.buttonSubmit} sx={{ mb: 2, mt: 2 }} variant="contained" color="primary" size="large" type="submit" fullWidth>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                        Clear
                    </Button>
                </div>
            </form>
        </Paper>
    );
}

export default Form;