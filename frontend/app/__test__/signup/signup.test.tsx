import Signup from './../../signup/page';
import {render, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';

jest.mock('./../../components/firebase', () => ({
    auth: {
        createUserWithEmailAndPassword: jest.fn(),
    }
}))

describe("Signup", () => {
    test("Correct submission", async () => {
        const mockSubmit = jest.fn().mockResolvedValue({});
        require('./../../components/firebase').auth.signInWithEmailAndPassword = mockSubmit
        const {getByPlaceholderText, getByText} = render(<Signup/>);

        fireEvent.change(getByPlaceholderText('Enter your name'), {target: {value: 'atest'}});
        fireEvent.change(getByPlaceholderText('Enter your email'), {target: {value: 'atest@mail.com'}});
        fireEvent.change(getByPlaceholderText('Enter your password'), {target: {value: 'password220'}});
    
        fireEvent.click(getByText('Sign Up'));

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith({
                email: 'atest@mail.com',
                password: 'password220',
            })
        })
    })

    test("Invalid Password", async () => {
        const mockSubmit = jest.fn().mockRejectedValue(new Error("Sorry, your password is a bit too weak. Ideally, it needs at least six characters."));
        require('./../../components/firebase').auth.createUserWithEmailAndPassword = mockSubmit;
        const {getByPlaceholderText, getByText, findByText} = render(<Signup/>);

        fireEvent.change(getByPlaceholderText('Enter your name'), {target: {value: 'atest'}});
        fireEvent.change(getByPlaceholderText('Enter your email'), {target: {value: 'atest@mail.com'}});
        fireEvent.change(getByPlaceholderText('Enter your password'), {target: {value: 'n'}});
    
        fireEvent.click(getByText('Sign Up'));

        await findByText("Sorry, your password is a bit too weak. Ideally, it needs at least six characters.");
    })

    test("Email Already Taken", async () => {
        const mockSubmit = jest.fn().mockRejectedValue(new Error("Sorry, this email has already been taken."));
        require('./../../components/firebase').auth.createUserWithEmailAndPassword = mockSubmit;
        const {getByPlaceholderText, getByText, findByText} = render(<Signup/>);

        fireEvent.change(getByPlaceholderText('Enter your name'), {target: {value: 'atest'}});
        fireEvent.change(getByPlaceholderText('Enter your email'), {target: {value: 'darkbrandonnnn@outlook.com'}}); // This is already in the database
        fireEvent.change(getByPlaceholderText('Enter your password'), {target: {value: 'password220'}});
    
        fireEvent.click(getByText('Sign Up'));

        await findByText("Sorry, this email has already been taken.");
    })
})