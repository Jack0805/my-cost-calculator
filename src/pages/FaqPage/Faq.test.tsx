import React from 'react';
import { render, screen } from '@testing-library/react';
import { FaqPage } from './Faq';
import faqData from '../../content/faq.json';

// Mock the SiteHeader and SiteFooter components
jest.mock('../../components', () => ({
  SiteHeader: () => <div data-testid="site-header">Header</div>,
  SiteFooter: () => <div data-testid="site-footer">Footer</div>,
}));

describe('FaqPage Component', () => {
  it('renders without crashing', () => {
    render(<FaqPage />);
    expect(screen.getByText('Frequent Asking Questions')).toBeInTheDocument();
  });

  it('displays the page title', () => {
    render(<FaqPage />);
    const title = screen.getByText('Frequent Asking Questions');
    expect(title).toBeInTheDocument();
  });

  it('renders SiteHeader and SiteFooter', () => {
    render(<FaqPage />);
    expect(screen.getByTestId('site-header')).toBeInTheDocument();
    expect(screen.getByTestId('site-footer')).toBeInTheDocument();
  });

  it('renders all FAQ items from JSON data', () => {
    render(<FaqPage />);

    faqData.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
      expect(screen.getByText(faq.answer)).toBeInTheDocument();
    });
  });

  it('renders the correct number of FAQ accordions', () => {
    render(<FaqPage />);

    // Count the number of accordions by looking for unique questions
    const questions = faqData.map(faq => screen.getByText(faq.question));
    expect(questions).toHaveLength(faqData.length);
  });

  it('displays FAQ questions in bold', () => {
    render(<FaqPage />);

    const firstQuestion = screen.getByText(faqData[0].question);
    const strongElement = firstQuestion.closest('strong');
    expect(strongElement).toBeInTheDocument();
  });
});
