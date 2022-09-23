import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import LockOutlined  from '@mui/icons-material/LockOutlined';
import Input from './Input';
import useStyles from './styles';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import jwt_decode from 'jwt-decode';
import FileBase from 'react-file-base64'; 

const initState = { firstName: '', lastName: '', email: '', password: '', profilepic: {}, userdetails: '' , confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp,setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const googleToken = jwt_decode(res.credential);
        localStorage.setItem('encodedProfile', res.credential);
        try {
            dispatch({type: AUTH, data: {googleToken} });
            navigate('/auth');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try again later');
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (   
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignUp && (
                            <div className={classes.imageStyle}>
                                <FileBase type="file" multiple={false} onDone={(base64) => setFormData({ ...formData, profilepic: base64 })} />
                            </div>
                        ) }
                        { isSignUp && (
                            <Input name="userdetails" label="User Details" handleChange={handleChange} type="text" />
                        ) }
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> } 
                    </Grid>
                    <br />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <br />
                    <GoogleOAuthProvider clientId="971085252524-mgcsnijlq5nivamlpb3f8flpdhcia7t4.apps.googleusercontent.com">
                        <GoogleLogin 
                            render={(renderProps) =>(
                                <Button 
                                    className={classes.googleButton}
                                    color="primary" 
                                    fullWidth 
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    startIcon={<Icon/>} 
                                    variant="contained">
                                        Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                    </GoogleOAuthProvider>
                    <br />   
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already Have an Account? Sign In' : 'Dont have and Account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;