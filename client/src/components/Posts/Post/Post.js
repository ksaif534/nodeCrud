import React, { useState } from 'react';
import { Card, CardActions, CardActionArea, CardContent, Button, Typography, CardMedia } from '@mui/material';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpOffAltOutlined from '@mui/icons-material/ThumbUpOffAltOutlined';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Post = ({post , setCurrentId}) => {
    // eslint-disable-next-line
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [likes,setLikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.googleId || user?.result?._id || user?.googleToken?.sub;
    const hasLikedPost = post?.likes.find((like) => like === (userId));

    const openPost = () => {
        return navigate(`/posts/${post._id}`);
    };

    const Likes = () => {
        if (likes?.length > 0) {
            return (hasLikedPost
            ? (
                <> <ThumbUpOffAlt fontSize="small" /> &nbsp; {likes.length > 2 ? `You & ${likes.length - 1} Others Like this` : `${likes.length} People like this`} </>
            ) : (
                <> <ThumbUpOffAltOutlined fontSize="small" /> &nbsp; {likes.length} {likes.length === 1 ? 'Like' : 'Likes'} </>
            ))
        }
        return <> <ThumbUpOffAltOutlined fontSize="small" />&nbsp; Like </>;
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
        <Card className={classes.card} elevation={6} style={{ borderRadius: '20px' }}>
            <CardMedia className={classes.media} component='img' image={post?.selectedFile} title={post?.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">
                    {post?.name || user?.googleToken?.name}
                </Typography>
                <Typography variant="body2">
                    {moment(post?.createdAt).fromNow()}
                </Typography>
            </div>
            {(userId === post?.creator) && (
                <div className={classes.overlay}>
                    <Button style={{color:'white'}} size="small" onClick={()=>setCurrentId(post._id)}>
                        <MoreHorizOutlined fontSize="medium" />
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
                { (user?.result) ? (
                    <Button size="small" color="primary" disabled={(!user?.result)} onClick={handleLike}>
                        <Likes />
                    </Button>
                ) : (
                    <Button size="small" color="primary" disabled={(!user?.googleToken)} onClick={handleLike}>
                        <Likes />
                    </Button>
                ) }
                { (userId === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteForeverOutlined fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>  
        </Card>
    );
}

export default Post;