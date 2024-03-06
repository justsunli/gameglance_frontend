"use client"

import React, { FC } from 'react';
import { Grid, Paper, TextField, Avatar, Button, Typography} from '@material-ui/core';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Link from 'next/link';

const Forgotpassword: FC = () => {
    const paperStyle: React.CSSProperties = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle: React.CSSProperties = { backgroundColor: 'red' };
    const buttonStyle: React.CSSProperties = { margin: '8px 0' };

    const CheckEmail = async() => {
        const email = String(document.getElementById('Email'));
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems="center" justifyContent='center'>
                    <Avatar style={avatarStyle}><VideogameAssetIcon /></Avatar>
                    <h2>Recover Password</h2>
                    <TextField id='Email' placeholder='Enter an email address' fullWidth required />
                    <Button onClick = {CheckEmail} type="submit" color="primary" variant="contained" style={buttonStyle} fullWidth>
                        Send to Email
                    </Button>
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