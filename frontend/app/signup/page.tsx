"use client"

import React, { FC } from 'react';
import { Grid, Paper, TextField, Avatar, Button, Typography } from '@material-ui/core';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Link from 'next/link';
import axios from 'axios';
import PersonProfile from '../components/PersonProfile';

const Signup: FC = () => {
    const paperStyle: React.CSSProperties = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle: React.CSSProperties = { backgroundColor: 'red' };
    const buttonStyle: React.CSSProperties = { margin: '8px 0' };
    
    const CreateProfile = async() => {
        // Create a profile for the user and send it to the backend
        // If the user's email is already used for an account, fail
        const name = String(document.getElementById('Name'));
        const email = String(document.getElementById('Email'));
        const password = String(document.getElementById('password'));
        try{
            //event?.preventDefault();
            const succCode = await axios.post('http://localhost:3000/addUser', {
                method: "POST",
                data: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            //const response = await axios.get('http://localhost:3001/getuserprofiles');
            
            //const profile = response.data[email];
            //console.error("A user with this email already exists");
        }catch(error){
            
        }
           
    }

    // @ts-ignore
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems="center" justifyContent='center'>
                    <Avatar style={avatarStyle}><VideogameAssetIcon /></Avatar>
                    <h2>Create an account</h2>
                    <TextField id='Name' placeholder='Enter your name' fullWidth required />
                    <TextField id='Email' placeholder='Enter an email address' fullWidth required />
                    <TextField id='Password' placeholder='Enter a password' type='password' fullWidth required />
                    <Button onClick = {CreateProfile} type="submit" color="primary" variant="contained" style={buttonStyle} fullWidth>
                        Sign Up
                    </Button>
                    <Typography>
                        Do you have an existing account?
                    </Typography>
                    <Link href="/login">Login here!</Link>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Signup;
