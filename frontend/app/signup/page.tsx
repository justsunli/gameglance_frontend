"use client"

import React, { FC } from 'react';
import { Grid, Paper, TextField, Avatar, Button, Typography } from '@material-ui/core';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Link from 'next/link';

const Signup: FC = () => {
    const paperStyle: React.CSSProperties = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle: React.CSSProperties = { backgroundColor: 'red' };
    const buttonStyle: React.CSSProperties = { margin: '8px 0' };
    
    // @ts-ignore
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems="center" justifyContent='center'>
                    <Avatar style={avatarStyle}><VideogameAssetIcon /></Avatar>
                    <h2>Create an account</h2>
                    <TextField label='Name' placeholder='Enter your name' fullWidth required />
                    <TextField label='Email' placeholder='Enter an email address' fullWidth required />
                    <TextField label='Password' placeholder='Enter a password' type='password' fullWidth required />
                    <Button type="submit" color="primary" variant="contained" style={buttonStyle} fullWidth>
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
