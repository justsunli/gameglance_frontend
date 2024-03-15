import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoCard from '../../components/InfoCard';

describe('InfoCard', () => {
  const props = {
    id: '1',
    imageLink: 'https://example.com/image.jpg',
    title: 'Test Title',
    badgeText: 'Test Badge'
  };

  it('should display the image, title, and badge text correctly', () => {
    render(<InfoCard {...props} />);

    const image = screen.getByRole('img', { name: props.title });
    expect(image).toHaveAttribute('src', props.imageLink);
    expect(image).toHaveAttribute('alt', props.title);

    const title = screen.getByText(props.title);
    expect(title).toBeInTheDocument();
    expect(title).toHaveStyle('color: white');

    const badge = screen.getByText(props.badgeText);
    expect(badge).toBeInTheDocument();
  });

});
