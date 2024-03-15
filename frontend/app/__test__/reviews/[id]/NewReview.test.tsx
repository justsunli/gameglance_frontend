import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewReview from '../../../reviews/[id]/NewReview'; // Adjust the import path as needed
import axios from 'axios';
import { auth } from '../../../components/firebase';

// mock the RatingSlider component
jest.mock('../../../components/RatingSlider', () => {
  return {
    __esModule: true,
    default: ({ onValueChange, defaultValue }) => (
      <input
        type="range"
        value={defaultValue}
        onChange={(e) => onValueChange(parseInt(e.target.value, 10))}
        data-testid="mock-rating-slider"
      />
    ),
  };
});

// mock axios and firebase auth
jest.mock('axios');
jest.mock('../../../components/firebase');

describe('NewReview', () => {
  const gameId = 1; 
  const mockUserEmail = 'test@example.com';
  const mockUserId = 12; 

  beforeEach(() => {
    // the current user is set to the mock user
    auth.currentUser = { email: mockUserEmail };

    // mock the axios calls
    axios.get.mockResolvedValue({ data: { id: mockUserId } });
    axios.post.mockResolvedValue({}); 
  });

  afterEach(() => {
    jest.clearAllMocks();
    auth.currentUser = null;
  });

  it('should include the user ID and rating in the form submission', async () => {
    render(<NewReview game_id={gameId} />);

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // set the rating
    fireEvent.change(screen.getByTestId('mock-rating-slider'), { target: { value: '85' } });

    // fill out the review
    fireEvent.change(screen.getByPlaceholderText('Input your review here'), { target: { value: 'Great game!' } });

    // submit the form
    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.BACKEND_URL}/review/addReview`,
        expect.objectContaining({
          user_id: mockUserId,
          game_id: gameId,
          review: 'Great game!',
          rating: 85,
        })
      );
    });
  });
});