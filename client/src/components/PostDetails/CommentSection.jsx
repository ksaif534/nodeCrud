import React, { useRef, useState } from 'react';
import { Typography, TextField, Button, Card } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost, updateComment, deleteComment } from '../../actions/posts';
import { v4 as uuid } from 'uuid';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('');
    const [commentId,setCommentId] = useState(null);
    const [editMode,setEditMode] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?._id || user?.googleToken?.sub;
    const dispatch = useDispatch();
    const commentsRef = useRef();
    let finalComment;

    const handleClick = async () => {
        if (user?.result?.name) {
            finalComment = {
                id: uuid(),
                commentCreator: user?.result?._id,
                comment: `${user?.result?.name}:${comment}`
            };   
        }
        if (user?.googleToken?.name) {
            finalComment = {
                id: uuid(),
                commentCreator: user?.googleToken?.sub,
                comment: `${user?.googleToken?.name}:${comment}`
            };
        }
        const newComments = await dispatch(commentPost(finalComment,post._id));
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const editComment = (e,comm) => {
        e.preventDefault();
        setComment(comm.comment);
        setCommentId(comm.id);
        setEditMode((prevEditMode) => !prevEditMode);
    }

    const commentToDelete = async (e,comm) => {
        e.preventDefault();
        const postsWithDeletedComments = await dispatch(deleteComment(comm,post._id));
        setComments(postsWithDeletedComments);
        setComment('');
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleUpdateClick = async (e) => {
        const commentToUpdate = {
            id: commentId,
            commentCreator: comment?.commentCreator,
            comment: comment
        }
        const newCommentsWithUpdates = await dispatch(updateComment(commentToUpdate,post._id));
        setComments(newCommentsWithUpdates);
        setComment('');
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    <Card elevation={6} className={classes.cardComment}>
                        { comments.map((c,i) => (c?.commentCreator === userId) ? (
                            <div key={i}>
                                <Typography gutterBottom variant="subtitle1">
                                    <strong>{i+1}. {c?.comment?.split(':')[0]}</strong>
                                </Typography>
                                <Typography gutterBottom variant="subtitle2">
                                    { c?.comment?.split(':')[1] }
                                </Typography>
                                <EditOutlinedIcon className={classes.iconHover} onClick={ (e) => editComment(e,c) } />
                                <DeleteOutlinedIcon className={classes.iconHover} onClick={ (e) => commentToDelete(e,c) } />
                            </div>
                        ) : (
                            <div key={i}>
                                <Typography gutterBottom variant="subtitle1">
                                    <strong>{i+1}. {c?.comment?.split(':')[0]}</strong>
                                </Typography>
                                <Typography gutterBottom variant="subtitle2">
                                    { c?.comment?.split(':')[1] }
                                </Typography>
                            </div>
                        )) }
                    </Card>
                </div>
                <div ref={commentsRef} />
                { (user?.result?.name || user?.googleToken?.name) && (
                    <div style={{ width: '50%' }}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField 
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={ (e) => setComment(e.target.value)}
                        />
                        { (editMode) ? (
                            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={(e) => handleUpdateClick(e)}>
                                Update Comment
                            </Button>
                        ) : (
                            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
                                Comment
                            </Button>
                        ) }
                    </div>
                ) }
            </div>
        </div>
    );
}

export default CommentSection;