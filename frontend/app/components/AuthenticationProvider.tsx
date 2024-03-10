import React, {ReactNode, useEffect, useState, useContext, createContext, } from 'react';
import {auth} from './firebase';
import {Auth, UserCredential, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, } from 'firebase/auth';

export interface AuthProviderProps {
    children?: ReactNode
}

// The context state of the user (id, whether they are authenticated/loading)
export interface UserContextState {
    isAuthenticated: boolean;
    loading: boolean
    id?: string
}

// Create the user context state
export const UserStateContext = createContext<UserContextState>(
    {} as UserContextState,
)

// The context of the authentication, such as inputs for authentication, status of user, etc.
export interface AuthenticationContextMod {
    auth: Auth
    user: User | null
    signIn: (email: string, password: string) => Promise<UserCredential>
    signUp: (email: string, password: string) => Promise<UserCredential>
    sendPasswordResetEmail?: (email: string) => Promise<void>
}

// Create the authentication context
export const AuthContext = React.createContext<AuthenticationContextMod>(
    {} as AuthenticationContextMod,
)

// 
export function useAuth(): AuthenticationContextMod {
    return useContext(AuthContext);
}

// Implement AuthProviderProps
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [user, setUser] = useState<User | null>(null)

    function signUp(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signIn(email: string, password: string): Promise<UserCredential>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    function resetPassword(email: string): Promise<void> {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        // Lets the client know if a user is set
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user);
        })
        return unsub;
    }, [])

    const values = {
        signUp, user, signIn, resetPassword, auth,
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useUsersContext = (): UserContextState => {
    return useContext(UserStateContext);
}