import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../../components/SearchBar'; 
import axios from 'axios';


jest.mock('axios');


describe('SearchBar', () => {
  it('updates the search results based on the user input', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: '1', name: 'Game 1' },
        { id: '2', name: 'Game 2' },
      ],
    });

    render(<SearchBar />);

    // click the search button
    fireEvent.click(screen.getByText('Search'));

    // type 'Game Name' into the search bar
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Game' } });

    // wait for the axios call to be made
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // check that the results are displayed
    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument();
      expect(screen.getByText('Game 2')).toBeInTheDocument();
    });
  });

});