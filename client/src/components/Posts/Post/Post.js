import React, { useState } from 'react';
import { Card, CardActions, CardActionArea, CardContent, Button, Typography, CardMedia } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Post = ({post , setCurrentId}) => {
    // eslint-disable-next-line
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [likes,setLikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = post?.likes.find((like) => like === (userId));

    const openPost = () => {
        return history(`/posts/${post._id}`);
    };

    const Likes = () => {
        if (likes?.length > 0) {
            return (hasLikedPost
            ? (
                <> <ThumbUpAltIcon fontSize="small" /> &nbsp; {likes.length > 2 ? `You & ${likes.length - 1} Others Like this` : `${likes.length} People like this`} </>
            ) : (
                <> <ThumbUpAltOutlinedIcon fontSize="small" /> &nbsp; {likes.length} {likes.length === 1 ? 'Like' : 'Likes'} </>
            ))
        }
        return <> <ThumbUpAltOutlinedIcon fontSize="small" />&nbsp; Like </>;
    }

    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== (userId)));    
        }else{
            setLikes([...post.likes, userId]);
        }
    }

    return (
        <Card className={classes.card} elevation={6}>
            <CardMedia className={classes.media} component='img' image={post?.selectedFile} title={post?.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">
                    {post?.name}
                </Typography>
                <Typography variant="body2">
                    {moment(post?.createdAt).fromNow()}
                </Typography>
            </div>
            {(userId === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color:'white'}} size="small" onClick={()=>setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <CardActionArea onClick={openPost}>
                <div className={classes.details}>
                    <Typography variant="body1" color="textSecondary">
                        {post?.tags.map((tag) => 
                            `#${tag}`)}
                    </Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>
                    {post?.title}
                </Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                        {post?.message}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                { (userId === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>  
        </Card>
    );
}

export default Post;