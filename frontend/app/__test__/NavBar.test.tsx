import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from '../NavBar';
import '@testing-library/jest-dom';
import * as firebaseAuth from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  onAuthStateChanged: jest.fn(),
  getAuth: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/link', () => ({ children, href }) => <a href={href}>{children}</a>);
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

describe('NavBar Component', () => {

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders NavBar and simulates logout', async () => {

    firebaseAuth.onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ email: 'test@example.com' }); 
      return jest.fn(); 
    });


    firebaseAuth.signOut.mockResolvedValue();

    render(<NavBar />);

    // assert that the user is logged in
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
    
    fireEvent.click(logoutButton);

    // assert that `signOut` was called
    expect(firebaseAuth.signOut).toHaveBeenCalled();

  });


});