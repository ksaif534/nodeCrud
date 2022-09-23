import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProfile, updateProfile } from '../../actions/users';
import { Container, Paper, Grid, Typography, Avatar, Button } from '@mui/material';
import LockOutlined  from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import Input from '../Auth/Input';
import FileBase from 'react-file-base64';

const EditProfile = () => {

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [showPassword,setShowPassword] = useState(false);
    var createdState;
    if (user?.result) {
      createdState = { firstName: user?.result?.name.split(' ')[0], lastName: user?.result?.name.split(' ')[1],  email: user?.result?.email, password: user?.result?.password, profilepic: user?.result?.profilepic, userdetails: user?.result?.userdetails };  
    }else{
      createdState = { firstName: user?.name.split(' ')[0], lastName: user?.name.split(' ')[1], email: user?.email, password: user?.password, profilepic: user?.profilepic, userdetails: user?.userdetails };
    }
    const [formData,setFormData] = useState(createdState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        fetchEditProfile();
    } , []);

    const fetchEditProfile = async () => {
      if (user?.result) {
          setUser(await dispatch(editProfile(user?.result?._id)).then(response => {
            return response?.data?.user;
          }));    
      }
    }

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (user?.result) {
        dispatch(updateProfile(formData,user?.result?._id));  
      }else{
        dispatch(updateProfile(formData,user?._id));
      }
    }

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} className={classes.paper} style={{ borderRadius: '20px' }}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          User Profile Form Edit
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={2}>
            <Input name="firstName" label="First Name" value={formData?.firstName} handleChange={handleChange} autoFocus half />
            <Input name="lastName" label="Last Name" value={formData?.lastName} handleChange={handleChange} half />
            <Input type="email" name="email" label="Email" value={formData?.email} handleChange={handleChange} />
            <Input type={showPassword ? "text" : "password"} name="password" value={formData?.password} handleChange={handleChange} handleShowPassword={handleShowPassword} label="Enter Password" />
            <Input type={showPassword ? "text" : "password"} name="confirmPassword" label="Confirm Password" value={formData?.password} handleChange={handleChange} handleShowPassword={handleShowPassword} />
            <Input name="userdetails" label="User Details" value={formData?.userdetails} handleChange={handleChange} />
            <div className={classes.imageStyle}>
              <FileBase type="file" multiple={false} onDone={(base64) => setFormData({ ...formData,profilepic: base64 })} />
            </div>
            <Button type="submit" fullWidth variant="contained" color="primary" size="small" className={classes.submit} style={{ justifyContent: 'center' }}>Update Profile</Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default EditProfile