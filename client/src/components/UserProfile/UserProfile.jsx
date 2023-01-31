import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile, deleteProfile } from '../../actions/users';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import useStyles from './styles';

const UserProfile   = () => {

  const [user,setUser]      = useState(JSON.parse(localStorage.getItem('profile')));  
  const dispatch            = useDispatch();
  const classes             = useStyles();
  const navigate            = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  },[]);

  const fetchUserProfile = async () => {
    if (user?.result) {
        setUser(await dispatch(getProfile(user?.result?._id)).then(response => response?.data?.user));    
    }else{
        setUser(await dispatch(getProfile(user?.googleToken?.sub)).then(response => response?.data?.user));
    }
  }

  const handleUpdateOption = () => {
    return navigate(`/users/profile/${user?._id}/edit`);   
  }

  const handleDeleteOptions = async () => {
    setUser(await dispatch(deleteProfile(user?._id)).then(response => console.log(response))); 
  }
    
  return (
    (user?.googleToken) ? (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={1} lg={1}>

            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10}>
                <Card elevation={6} className={classes.card} style={{ borderRadius: '20px' }}>
                    <CardMedia image={user?.googleToken?.picture} component='img' className={classes.cardMedia} />
                    <div className={classes.overlay}>
                        <Typography variant="h3">
                            { user?.googleToken?.name }
                        </Typography>
                    </div>
                    <CardContent>
                        <Typography variant="h5">

                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1}>

            </Grid>
        </Grid>
    ) : (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={2} lg={2}>

            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <Card elevation={6} className={classes.card} style={{ borderRadius: '20px' }}>
                    <CardMedia image={user?.profilepic?.base64} component='img' className={classes.cardMedia} />
                    <div className={classes.overlay}>
                        <Typography variant="h3">
                            { user?.name }
                        </Typography>
                    </div>
                    <div className={classes.overlay2}>
                        <Button style={{color:'white'}} size="small">
                            <MoreHorizOutlined fontSize="medium" onClick={handleUpdateOption} />
                        </Button>
                    </div>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={10} md={10} lg={10}>
                                <Typography variant="h5">
                                    { user?.userdetails }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2} md={2} lg={2}>
                                <Button size="small">
                                    <DeleteIcon fontSize="medium" onClick={handleDeleteOptions} />
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>

            </Grid>
        </Grid>
    )
  )
}

export default UserProfile