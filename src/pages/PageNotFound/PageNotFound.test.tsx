import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PageNotFound } from './PageNotFound';

describe('PageNotFound Component', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderWithRouter();
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('displays the 404 heading', () => {
    renderWithRouter();
    const heading = screen.getByRole('heading', { name: /404 - page not found/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays the error message', () => {
    renderWithRouter();
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });

  it('displays a link to go back to home', () => {
    renderWithRouter();
    const homeLink = screen.getByRole('link', { name: /go back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('displays the 404 image', () => {
    renderWithRouter();
    const image = screen.getByAltText('Bill Split 404');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('title', 'Bill Split 404');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
