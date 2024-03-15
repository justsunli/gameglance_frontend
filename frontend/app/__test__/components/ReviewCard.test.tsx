import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ReviewCard from '../../components/ReviewCard';
import '@testing-library/jest-dom';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ReviewCard', () => {
  const mockGameId = 1;
  const mockReviews = [
    { id: 1, user_id: 1, review: 'This is a great game!', rating: 80 },
    { id: 2, user_id: 2, review: 'Not bad, but could be better.', rating: 65 }
  ];

  const mockUsernames = ['User1', 'User2'];

  beforeEach(() => {
    mockedAxios.get.mockImplementation((url: string) => {
      if (url.includes('/game/getGameReviews/')) {
        return Promise.resolve({ data: mockReviews });
      } else if (url.includes('/user/')) {
        const userId = parseInt(url.split('/').pop()!, 10);
        return Promise.resolve({ data: { username: mockUsernames[userId - 1] } });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display the reviews after fetching them', async () => {
    render(<ReviewCard game_id={mockGameId} />);

    await waitFor(() => {
      mockReviews.forEach(review => {
        expect(screen.getByText(review.review)).toBeInTheDocument();
        expect(screen.getByText(mockUsernames[review.user_id - 1])).toBeInTheDocument();
      });
    });
  });


});
