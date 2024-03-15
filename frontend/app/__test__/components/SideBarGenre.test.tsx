import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SideBarGenre from '../../components/SideBarGenre';

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  };
});

describe('SideBarGenre Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<SideBarGenre onSubmit={mockOnSubmit} selectionType="genre" />);
  });

  it('should render the component correctly', () => {
    expect(screen.getByText(/Select the genres you want to play/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filter/ })).toBeInTheDocument();
  });

  it('should allow checkbox selection and form submission', async () => {
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(19); 
    
    // Simulate user clicking the first checkbox
    await userEvent.click(checkboxes[0]);

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: /Filter/ });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Expect the onSubmit callback to be called with the first item's ID
      expect(mockOnSubmit).toHaveBeenCalledWith([expect.any(String)]);
    });
  });

  it('should switch items based on the selection type', () => {
    render(<SideBarGenre onSubmit={mockOnSubmit} selectionType="tag" />);
    expect(screen.getByText(/Select the tags you are interested in/)).toBeInTheDocument();
  });

});