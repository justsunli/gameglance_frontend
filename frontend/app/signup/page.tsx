"use client"

import React, { FC, useState } from 'react';
import { Grid, Paper, TextField, Avatar, Button, Typography } from '@mui/material';
// import { Grid, Avatar, Text} from "@radix-ui/themes";
// import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import { PiGameControllerFill } from "react-icons/pi";
import Link from 'next/link';
// import {BrowserRouter, Router, redirect, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {auth} from '../components/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { useRouter } from 'next/navigation';

const SignupPage: FC = () => {
    const paperStyle: React.CSSProperties = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle: React.CSSProperties = { backgroundColor: 'red' };
    const buttonStyle: React.CSSProperties = { margin: '8px 0', backgroundColor: 'lightcyan', borderWidth: 2, borderColor: 'black', paddingLeft: 8, paddingRight: 8};
    const linkStyle: React.CSSProperties = {backgroundColor: 'lightcyan', borderWidth: 2, borderColor: 'black', paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3};
    const inputStyle: React.CSSProperties = {margin: '8px 0', borderWidth: 2, borderColor: 'gray', paddingLeft: 8, paddingRight: 8};
    const typographyStyle: React.CSSProperties = {margin: '8px 0'};

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

    const router = useRouter();

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
            // const user_id = userCred.user.id;
            // navigate('/', {replace: true});
            // navigate(0);
            router.push('/');
            const succCode = await axios({
                method: 'POST',
                url: '${process.env.BACKEND_URL}/user/addUser',
                data: JSON.stringify({
                    "name": name,
                    "email": email
                })
            });
        }catch(error: unknown){
            const err = error as FirebaseError;
            setErrorHandler({
                isError: true,
                errorMessage: ERRORS[err.code as keyof typeof ERRORS],
                //errorMessage: err.code,
            })
        }
    }

    // @ts-ignore
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems="center" justifyContent='center'>
                    <Avatar style={avatarStyle}><PiGameControllerFill /></Avatar>
                    <h2>Create an account</h2>
                    <form onSubmit = {CreateProfile}>
                        <input id = "name" placeholder='Enter your name' onChange = {e => setName(e.target.value)} type = "name" style = {inputStyle}/>
                        <input id = "email" placeholder='Enter your email' onChange = {e => setEmail(e.target.value)} type = "email" style = {inputStyle}/>
                        <input id = "password" placeholder='Enter your password' onChange = {e => setPassword(e.target.value)} type = "password" style = {inputStyle}/>
                        <button type="submit" color="primary" style={buttonStyle}>Sign Up</button>
                    </form>
                    <Typography style = {typographyStyle}>
                        Do you have an existing account?
                    </Typography>
                    <Link href="/login" style={linkStyle}>Login here!</Link>
                    {errorHandler.isError ?(
                        <div>{errorHandler.errorMessage}</div>
                    ): null}
                </Grid>
            </Paper>
        </Grid>
    );
}

const Signup: FC = () => {
    return <SignupPage />;
}
export default Signup;
