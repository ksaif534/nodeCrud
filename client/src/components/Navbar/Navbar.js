import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Typography,AppBar,Toolbar,Button,Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useNavigate();
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
        history('/auth');
        setUser(null);
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <img className={classes.image} src={memoriesLogo} alt="memories" height="40"/>
                <img className={classes.image} src={memoriesText} alt="memories" height="40"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user.result.name}
                            </Typography>
                            <Button className={classes.logout} variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                        </div>
                    ): (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                    )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;