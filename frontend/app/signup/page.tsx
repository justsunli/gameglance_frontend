"use client"

import React, { FC, useState } from 'react';
import { Grid, Paper, TextField, Avatar, Button, Typography } from '@material-ui/core';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Link from 'next/link';
import {redirect} from 'react-router-dom';
import axios from 'axios';
import {auth} from '../components/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';


const Signup: FC = () => {
    const paperStyle: React.CSSProperties = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle: React.CSSProperties = { backgroundColor: 'red' };
    const buttonStyle: React.CSSProperties = { margin: '8px 0' };
    
    // Error types
    const ERRORS = {
        "auth/email-already-in-use": "Sorry, this email has already been taken.",
        "auth/weak-password": "Sorry, your password is a bit too weak. Ideally, it needs at least six characters.",
    };
    // the name
    const[name, setName] = useState('');
    // the email
    const[email, setEmail] = useState('');
    // the password
    const[password, setPassword] = useState('');

    // whether an error occurred
    const [errorHandler, setErrorHandler] = useState({
        isError: false,
        errorMessage: "",
    })

    const CreateProfile = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Create a profile for the user and send it to the backend
        // If the user's email is already used for an account, fail
        
        // Input form data is then used for authentication
        //const inputForm = e.target as HTMLFormElement;
        //const inputVals = new FormData(inputForm);
        try {
            setErrorHandler({isError: false, errorMessage: ""});
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const succCode = await axios.post('http://localhost:3000/addUser', {
                method: "POST",
                data: JSON.stringify({
                    name: name,
                    email: email,
                    password: email,
                })
            });
            redirect("/");
        }catch(error: unknown){
            const err = error as FirebaseError;
            setErrorHandler({
                isError: true,
                errorMessage: ERRORS[err.code as keyof typeof ERRORS],
            })
        }
    }

    // @ts-ignore
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems="center" justifyContent='center'>
                    <Avatar style={avatarStyle}><VideogameAssetIcon /></Avatar>
                    <h2>Create an account</h2>
                    <form onSubmit = {CreateProfile}>
                        <input id = "name" placeholder='Enter your name' onChange = {e => setName(e.target.value)} type = "name" />
                        <input id = "email" placeholder='Enter your email' onChange = {e => setEmail(e.target.value)} type = "email" />
                        <input id = "password" placeholder='Enter your password' onChange = {e => setPassword(e.target.value)} type = "password" />
                        <button type="submit" color="primary" style={buttonStyle}>Sign Up</button>
                    </form>
                    <Typography>
                        Do you have an existing account?
                    </Typography>
                    <Link href="/login">Login here!</Link>
                    {errorHandler.isError ?(
                        <div>{errorHandler.errorMessage}</div>
                    ): null}
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Signup;
