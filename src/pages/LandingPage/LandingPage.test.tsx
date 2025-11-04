import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { LandingPage } from './LandingPage';
import groupMembersReducer from '../../store/groupMembersSlice';
import costItemsReducer from '../../store/costItemsSlice';

// Mock the components
jest.mock('../../components', () => ({
  SiteHeader: () => <div data-testid="site-header">Header</div>,
  SiteFooter: () => <div data-testid="site-footer">Footer</div>,
  ResponsiveDialog: ({ open, title, handleClose, handleContinue }: any) =>
    open ? (
      <div data-testid="responsive-dialog">
        <div>{title}</div>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleContinue}>Continue</button>
      </div>
    ) : null,
}));

// Mock useNavigateTo hook
const mockNavigateToGroupMemberPage = jest.fn();
jest.mock('../../hooks/', () => ({
  useNavigateTo: () => ({
    navigateToGroupMemberPage: mockNavigateToGroupMemberPage,
  }),
}));

// Mock persistor
jest.mock('../../store/store', () => ({
  persistor: {
    purge: jest.fn(),
  },
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      groupMember: groupMembersReducer,
      costItems: costItemsReducer,
    },
    preloadedState: initialState,
  });
};

describe('LandingPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (store: any) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders without crashing', () => {
    const store = createMockStore();
    renderWithProviders(store);
    expect(screen.getByText('Bill Split')).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    const store = createMockStore();
    renderWithProviders(store);
    expect(screen.getByText('Bill Split')).toBeInTheDocument();
    expect(screen.getByText('100% free to use')).toBeInTheDocument();
  });

  it('renders SiteHeader and SiteFooter', () => {
    const store = createMockStore();
    renderWithProviders(store);
    expect(screen.getByTestId('site-header')).toBeInTheDocument();
    expect(screen.getByTestId('site-footer')).toBeInTheDocument();
  });

  it('displays only "Start New Calculation" button when there is no saved data', () => {
    const store = createMockStore();
    renderWithProviders(store);

    expect(screen.getByText('Start New Calculation')).toBeInTheDocument();
    expect(screen.queryByText('Continue')).not.toBeInTheDocument();
    expect(screen.queryByText(/your previous data is saved/i)).not.toBeInTheDocument();
  });

  it('displays both "Continue" and "Start New Calculation" buttons when there is saved data', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob'] },
      costItems: { items: [] },
    });
    renderWithProviders(store);

    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(screen.getByText('Start New Calculation')).toBeInTheDocument();
    expect(screen.getByText(/your previous data is saved/i)).toBeInTheDocument();
  });

  it('shows alert message when there is saved data', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice'] },
      costItems: { items: [] },
    });
    renderWithProviders(store);

    const alert = screen.getByText(/your previous data is saved/i);
    expect(alert).toBeInTheDocument();
  });

  it('navigates to group member page when "Start New Calculation" is clicked with no saved data', () => {
    const store = createMockStore();
    renderWithProviders(store);

    const startButton = screen.getByText('Start New Calculation');
    fireEvent.click(startButton);

    expect(mockNavigateToGroupMemberPage).toHaveBeenCalledTimes(1);
  });

  it('navigates to group member page when "Continue" is clicked', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice'] },
      costItems: { items: [] },
    });
    renderWithProviders(store);

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    expect(mockNavigateToGroupMemberPage).toHaveBeenCalledTimes(1);
  });

  it('opens confirmation dialog when "Start New Calculation" is clicked with saved data', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice'] },
      costItems: { items: [] },
    });
    renderWithProviders(store);

    const startButton = screen.getByText('Start New Calculation');
    fireEvent.click(startButton);

    expect(screen.getByTestId('responsive-dialog')).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to start a new calculation/i)).toBeInTheDocument();
  });

  it('displays an image with proper attributes', () => {
    const store = createMockStore();
    renderWithProviders(store);

    const images = screen.getAllByRole('img');
    const mainImage = images.find(img => img.hasAttribute('loading') && img.getAttribute('loading') === 'lazy');

    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('loading', 'lazy');
  });

  it('displays the tagline text', () => {
    const store = createMockStore();
    renderWithProviders(store);

    expect(screen.getByText(/easily splitting bills with friends using billsplit.io/i)).toBeInTheDocument();
    expect(screen.getByText(/"with just simple 3 steps"/i)).toBeInTheDocument();
  });

  it('displays "Introducing:" label', () => {
    const store = createMockStore();
    renderWithProviders(store);

    expect(screen.getByText('Introducing:')).toBeInTheDocument();
  });
});
