import Profile from './../../profile/page';
import {render, waitFor, screen} from '@testing-library/react';
import React from 'react';
import axios from 'axios';

jest.mock('axios');

describe('ProfilePage', () => {
    test('Displays user profile following a fetch from backend', async() => {
        const username = 'atest';
        const userEmail = 'atest@mail.com';
        const userId = 35;

        axios.get = jest.fn().mockResolvedValueOnce({data: {id: userId, email: userEmail, username}})
        
        const {findByText} = render(<Profile/>);

        await waitFor(() => {
            expect(findByText(username));
            expect(findByText(userEmail));
        });
    });

    test('Displays "Please login" message when user has not logged in', async() =>{
        axios.get = jest.fn().mockResolvedValueOnce(null);
        const {findByText} = render(<Profile/>);

        await waitFor(() => {
            expect(findByText('Please login to view your profile.'));
        })
    })

    test('renders reviews with the right data', async() => {
        const reviewData = [
            {id: 1, game_id: 73, review: "Great game! I love it!", rating: 8},
            {id: 2, game_id: 74, review: 'this is just fine.', rating: 6},
        ];

        const gameData = [
            {name: 'Laserlife', image_link: 'https://media.rawg.io/media/screenshots/7fc/7fc2823632067ce1306495739708e0ef.jpg'},
            {name: 'Instant Indie Collection: Vol. 2', image_link: 'https://media.rawg.io/media/screenshots/76a/76a2e1f803267a80fcc2783ee1b84708.jpg'},
        ];

        axios.get = jest.fn().mockImplementation((url) => {
            if(url.includes('user/email')) {
                return Promise.resolve({data: {id: 35, email: 'atest@mail.com', username: 'atest'}});
            }
            else if(url.includes('review/user')) {
                return Promise.resolve({data: reviewData});
            }
            else if (url.includes('game')) {
                return Promise.resolve({data: gameData.find(game => url.includes('${game.game_id}'))});
            }
        });

        render(<Profile/>);

        await waitFor(() => {
            expect(screen.findByText("Great game! I love it!"));
            expect(screen.findByText('this is just fine.'));
            expect(screen.findByText('Laserlife'));
            expect(screen.findByText('Instant Indie Collection: Vol. 2'));
            expect(screen.findByText('8'));
            expect(screen.findByText('6'));
        })
    })
})