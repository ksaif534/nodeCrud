import React, { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography,AppBar,Toolbar,Button,Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import midnightImage from '../../images/midnight.jpeg';
import instaGram from '../../images/insta.png';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect((user) => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logOut();
            }
        }
        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logOut = () => {
        dispatch({type: LOGOUT});
        navigate('/auth');
        setUser(null);
        window.location.reload();
    };

    const signInPage = () => {
        navigate('/auth');
    }

    const getUserProfile = () => {
        if (user?.result) { 
            navigate(`users/profile/${user?.result?._id}`);   
        }else {
            navigate(`users/profile/${user?.googleToken?.sub}`); 
        }
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <img className={classes.image} src={midnightImage} alt="memories" height="40"/>
                <img className={classes.image} src={instaGram} alt="memories" height="40"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {(user?.result) && (
                    <div className={classes.toolbarContainer}>
                        <div className={classes.avatarText}>
                            <Avatar className={classes.avatar} alt={user?.result?.name} src={user?.result?.imageUrl} onClick={getUserProfile}>
                                {user.result?.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user.result?.name}
                            </Typography>
                        </div>
                        <div className={classes.profile}>
                            <Button className={classes.logout} variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                        </div>
                    </div>
                )}
                { (user?.googleToken) && (
                    <div className={classes.toolbarContainer}>
                        <div className={classes.avatarText}>
                            <Avatar className={classes.avatar} alt={user?.googleToken?.name} src={user?.googleToken?.picture} onClick={getUserProfile}>
                                {user.googleToken?.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user?.googleToken?.name}
                            </Typography>
                        </div>
                        <div className={classes.profile}>
                            <Button className={classes.logout} variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                        </div>
                    </div>
                ) }
                { !(user?.result || user?.googleToken) && (
                    <Button onClick={signInPage} variant="contained" color="primary">Sign in</Button>
                ) }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;