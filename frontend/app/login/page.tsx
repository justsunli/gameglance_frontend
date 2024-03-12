"use client"

import { FormControlLabel, Grid, Paper, TextField } from '@mui/material';
import { Avatar } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
// import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import { PiGameControllerFill } from "react-icons/pi";

import { Typography} from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import { error } from 'console';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase';
// import { BrowserRouter, redirect, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

import { useRouter } from 'next/navigation';


interface LoginProps {}

class IncorrectPasswordError extends SyntaxError {}

const LoginPage: FC<LoginProps> = () => {

    const paperStyle: React.CSSProperties = {padding: 20, height: '70vh', width: 280, margin: "20px auto"}
    const avatarStyle: React.CSSProperties = {backgroundColor: 'red'}
    const buttonStyle: React.CSSProperties = { margin: '8px 0', backgroundColor: 'lightcyan', borderWidth: 2, borderColor: 'black', paddingLeft: 8, paddingRight: 8};
    const linkStyle: React.CSSProperties = {backgroundColor: 'lightcyan', borderWidth: 2, borderColor: 'black', paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3};
    const inputStyle: React.CSSProperties = {margin: '8px 0', borderWidth: 2, borderColor: 'gray', paddingLeft: 8, paddingRight: 8};
    const typographyStyle: React.CSSProperties = {margin: '8px 0'};

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
    
    const AuthenticateUser = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
           
        try{
            setErrorHandler({isError: false, errorMessage: ""});
            // See if the given name exists in the backend database
            const loginCred = await signInWithEmailAndPassword(
                auth, email, password,
            );
            // const user_id = loginCred.user.id;
             //FIXME: Redirect user to home page if login is successful
             router.push('/');

        } catch(error: unknown){
            const err = error as FirebaseError;
            setErrorHandler({
                isError: true,
                errorMessage: "Email or password is incorrect."
            })
        }
    }

    // @ts-ignore
    return (
        <Grid>
            <Paper elevation = {10} style = {paperStyle}>
                <Grid alignItems="center" justifyContent='center'>
                    <Avatar style = {avatarStyle}>
                        <PiGameControllerFill/>
                    </Avatar>
                    <h2>Login</h2>
                    <form onSubmit = {AuthenticateUser}>
                        <input id = "email" placeholder='Enter your email' onChange = {e => setEmail(e.target.value)} type = "email" style = {inputStyle}/>
                        <input id = "password" placeholder='Enter your password' onChange = {e => setPassword(e.target.value)} type = "password" style = {inputStyle}/>
                        <button type="submit" color="primary" style={buttonStyle}>Login</button>
                    </form>
                    {/* <FormControlLabel
                        control = {
                            <CheckBox
                                name = "checkedB"
                                color = "primary"
                            />
                        }
                        label = "Remember me"
                    /> */}
                    <Typography style = {typographyStyle}>
                        Forgot password?
                    </Typography>
                    
                    <Link href="/forgotpassword" style = {linkStyle}>Reset your password here!</Link>
                    <Typography style = {typographyStyle}>                      
                        New to GameGlance?
                    </Typography>
                    <Link href="/signup" style = {linkStyle}>Sign up here!</Link>
                    {errorHandler.isError ?(
                        <div>{errorHandler.errorMessage}</div>
                    ): null}
                </Grid>
            </Paper>
        </Grid>
    )
}

const Login: FC = () => {
    return <LoginPage/>
}
export default Login;