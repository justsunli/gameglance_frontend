import Login from './../../login/page';
import {render, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';

jest.mock('./../../components/firebase', () => ({
    auth: {
        signInWithEmailAndPassword: jest.fn(),
    }
}))

describe("Login", () => {
    test("Correct submission", async () => {
        const mockSubmit = jest.fn().mockResolvedValue({});
        require('./../../components/firebase').auth.signInWithEmailAndPassword = mockSubmit;
        
        const {getByPlaceholderText, getByText} = render(<Login/>);
        fireEvent.change(getByPlaceholderText('Enter your email'), {target: {value: 'atest@mail.com'}});
        fireEvent.change(getByPlaceholderText('Enter your password'), {target: {value: 'password220'}});
    
        fireEvent.click(getByText('Login'));

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith('atest@mail.com', 'password220');
        })
    })

    test("Invalid Password", async () => {
        const mockSubmit = jest.fn().mockRejectedValue(new Error("Email or password is incorrect."));
        require('./../../components/firebase').auth.signInWithEmailAndPassword = mockSubmit;

        const {getByPlaceholderText, getByText, findByText} = render(<Login/>);

        fireEvent.change(getByPlaceholderText('Enter your email'), {target: {value: 'atest@mail.com'}});
        fireEvent.change(getByPlaceholderText('Enter your password'), {target: {value: 'password221'}});
    
        fireEvent.click(getByText('Login'));

        await findByText("Email or password is incorrect.");
    })

    test("Invalid Email", async () => {
        const mockSubmit = jest.fn().mockRejectedValue(new Error("Email or password is incorrect."));
        require('./../../components/firebase').auth.signInWithEmailAndPassword = mockSubmit;

        const {getByPlaceholderText, getByText, findByText} = render(<Login/>);

        fireEvent.change(getByPlaceholderText('Enter your email'), {target: {value: 'test@mail.com'}});
        fireEvent.change(getByPlaceholderText('Enter your password'), {target: {value: 'password220'}});
    
        fireEvent.click(getByText('Login'));

        await findByText("Email or password is incorrect.");
    })
})