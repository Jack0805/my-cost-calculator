import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock jsPDF to avoid canvas issues in test environment
jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        getWidth: () => 297,
      },
    },
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    text: jest.fn(),
    addImage: jest.fn(),
    save: jest.fn(),
    output: jest.fn(() => ({ size: 1024, type: 'application/pdf' })),
  }));
});

jest.mock('html2canvas', () => {
  return jest.fn().mockResolvedValue({
    width: 1920,
    height: 1080,
    toDataURL: jest.fn(() => 'data:image/png;base64,mock'),
  });
});

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
