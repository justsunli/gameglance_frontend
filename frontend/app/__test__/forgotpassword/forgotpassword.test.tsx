import ForgotPassword from './../../forgotpassword/page';
import {render, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';

jest.mock('./../../components/firebase', () => ({
    auth: {
        sendPasswordResetEmail: jest.fn(),
    },
}));

describe("Forgot Password", () => {
    test("Correct submission", async () => {
        const mockSubmit = jest.fn().mockResolvedValue({});
        require('./../../components/firebase').auth.sendPasswordResetEmail = mockSubmit;
        
        const {getByPlaceholderText, getByText} = render(<ForgotPassword/>);
        fireEvent.change(getByPlaceholderText('Enter your email'), {target: {value: 'atest@mail.com'}});
        fireEvent.click(getByText('Send to Email'));

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith('atest@mail.com');
        })
    })

    test("Invalid Email", async () => {
        const email = 'atest@mails.com';
        const mockSubmit = jest.fn().mockRejectedValue(new Error('There is no user with this given email: ${email}'));
        require('./../../components/firebase').auth.signInWithEmailAndPassword = mockSubmit;

        const {getByPlaceholderText, getByText, findByText} = render(<ForgotPassword/>);

        fireEvent.change(getByPlaceholderText('Enter your email'), {target: {value: email}});
    
        fireEvent.click(getByText('Send to Email'));

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('There is no user with this given email: ${email}');
        })
    })
})