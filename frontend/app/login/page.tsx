"use client"

import { FormControlLabel, Grid, Paper, TextField } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import { CheckBox } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Typography} from '@material-ui/core';
import Link from 'next/link';
import axios from 'axios';

interface LoginProps {}

const Login: FC<LoginProps> = () => {

    const paperStyle: React.CSSProperties = {padding: 20, height: '70vh', width: 280, margin: "20px auto"}
    const avatarStyle: React.CSSProperties = {backgroundColor: 'red'}
    const buttonStyle: React.CSSProperties = {margin: '8px 0'}
    
        /* const Authenticate = async() => {
            try{
                // See if the given name exists in the backend database
                const response = await axios.get('http://localhost:3001/getuserprofiles');
                const profile = response.data[]

            } catch(error) {
                console.error('There was an error authenticating the user: ', error);
            }
        } */

    // @ts-ignore
    return (
        <Grid>
            <Paper elevation = {10} style = {paperStyle}>
                <Grid alignItems="center" justifyContent='center'>
                    <Avatar style = {avatarStyle}>
                        <VideogameAssetIcon/>
                    </Avatar>
                    <h2>Login</h2>
                    <TextField id = 'Email' placeholder='Enter an email address' fullWidth required/>
                    <TextField id = 'Password' placeholder='Enter a password' type='password' fullWidth required/>
                    <FormControlLabel
                        control = {
                            <CheckBox
                                name = "checkedB"
                                color = "primary"
                            />
                        }
                        label = "Remember me"
                    />
                    <Button onClick = {() => "Authenticate()"} type="submit" color = "primary" variant = "contained" style = {buttonStyle} fullWidth>
                        Login
                    </Button>
                    <Typography>
                        Forgot password?
                    </Typography>
                    
                    <Link href="/forgotpassword">Reset your password here!</Link>
                    <Typography>                      
                        New to GameGlance?
                    </Typography>
                    <Link href="/signup">Sign up here!</Link>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login;