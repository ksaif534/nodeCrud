import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import  Visibility  from '@mui/icons-material/Visibility';
import  VisibilityOffOutlined  from '@mui/icons-material/VisibilityOffOutlined';

const Input = ({ handleChange,handleShowPassword,type,autoFocus,label,name,half,value }) => {
    return (
        <Grid item xs={12} sm={ half ? 6 : 12}>
            <TextField 
                name={name} 
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                value={value}
                label={label} 
                autoFocus={autoFocus}
                type={type}
                InputProps={(name === 'password' || name === 'confirmPassword') ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                { type === 'password' ? <Visibility /> : <VisibilityOffOutlined /> }
                            </IconButton>
                        </InputAdornment>
                    ) ,
                } : null
            }
            /> 
        </Grid>
    )
}

export default Input;
