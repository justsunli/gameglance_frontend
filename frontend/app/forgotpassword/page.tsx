"use client"

import React, { FC, useState } from 'react';
import { Grid, Paper, TextField, Avatar, Button, Typography} from '@material-ui/core';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Link from 'next/link';
import { error } from 'console';
import axios from 'axios';

import {auth} from '../components/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const Forgotpassword: FC = () => {
    const paperStyle: React.CSSProperties = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle: React.CSSProperties = { backgroundColor: 'red' };
    const buttonStyle: React.CSSProperties = { margin: '8px 0' };

        // the email
        const[email, setEmail] = useState('');

    const CheckEmail = async() => {
        
        try{
            sendPasswordResetEmail(auth, email);
            //FIXME: Send email here
        }catch(error){
            // The authentication could not find a profile matching the given email
            console.error('There is no user with this given email: ', email);
        }
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems="center" justifyContent='center'>
                    <Avatar style={avatarStyle}><VideogameAssetIcon /></Avatar>
                    <h2>Recover Password</h2>
                    <form onSubmit = {CheckEmail}>
                        <input id = "email" placeholder='Enter your email' onChange = {e => setEmail(e.target.value)} type = "email" />
                        <button type="submit" color="primary" style={buttonStyle}>Send to Email</button>
                    </form>
                    <Typography>
                        Know your password?
                    </Typography>
                    <Link href="/login">Login here!</Link>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Forgotpassword;