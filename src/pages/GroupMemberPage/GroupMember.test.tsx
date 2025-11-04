import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { GroupMemberPage } from './GroupMember';
import groupMembersReducer from '../../store/groupMembersSlice';
import costItemsReducer from '../../store/costItemsSlice';

// Mock the components
jest.mock('../../components', () => ({
  SiteHeader: () => <div data-testid="site-header">Header</div>,
  SiteFooter: () => <div data-testid="site-footer">Footer</div>,
  CustomizedSteppers: ({ currentStep }: any) => <div data-testid="stepper">Step {currentStep}</div>,
  ResponsiveDialog: ({ open, title, handleClose }: any) =>
    open ? (
      <div data-testid="responsive-dialog">
        <div>{title}</div>
        <button onClick={handleClose}>Close</button>
      </div>
    ) : null,
}));

// Mock useNavigateTo hook
const mockNavigateToCostItemsPage = jest.fn();
const mockNavigateBack = jest.fn();
jest.mock('../../hooks/', () => ({
  useNavigateTo: () => ({
    navigateToCostItemsPage: mockNavigateToCostItemsPage,
    navigateBack: mockNavigateBack,
  }),
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

describe('GroupMemberPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (store: any) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <GroupMemberPage />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders without crashing', () => {
    const store = createMockStore();
    renderWithProviders(store);
    expect(screen.getByText('Step 1. Add Participants')).toBeInTheDocument();
  });

  it('renders SiteHeader, SiteFooter, and Stepper', () => {
    const store = createMockStore();
    renderWithProviders(store);
    expect(screen.getByTestId('site-header')).toBeInTheDocument();
    expect(screen.getByTestId('site-footer')).toBeInTheDocument();
    expect(screen.getByTestId('stepper')).toBeInTheDocument();
  });

  it('displays the correct step in the stepper', () => {
    const store = createMockStore();
    renderWithProviders(store);
    expect(screen.getByText('Step 0')).toBeInTheDocument();
  });

  it('renders the person name input field', () => {
    const store = createMockStore();
    renderWithProviders(store);
    const input = screen.getByLabelText('Person Name');
    expect(input).toBeInTheDocument();
  });

  it('renders the add button', () => {
    const store = createMockStore();
    renderWithProviders(store);
    const addButton = screen.getByLabelText('Start Splitting Bills');
    expect(addButton).toBeInTheDocument();
  });

  it('adds a member when valid name is entered and add button is clicked', () => {
    const store = createMockStore();
    renderWithProviders(store);

    const input = screen.getByLabelText('Person Name');
    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];

    fireEvent.change(input, { target: { value: 'alice' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('capitalizes the first letter of the name', () => {
    const store = createMockStore();
    renderWithProviders(store);

    const input = screen.getByLabelText('Person Name');
    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];

    fireEvent.change(input, { target: { value: 'bob' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows error when trying to add empty name', () => {
    const store = createMockStore();
    renderWithProviders(store);

    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];
    fireEvent.click(addButton);

    expect(screen.getByText('The field cannot be empty')).toBeInTheDocument();
  });

  it('clears input field after successfully adding a member', () => {
    const store = createMockStore();
    renderWithProviders(store);

    const input = screen.getByLabelText('Person Name') as HTMLInputElement;
    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];

    fireEvent.change(input, { target: { value: 'Alice' } });
    fireEvent.click(addButton);

    expect(input.value).toBe('');
  });

  it('shows duplicate name dialog when adding a name that already exists', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice'] },
      costItems: { items: [] },
    });
    renderWithProviders(store);

    const input = screen.getByLabelText('Person Name');
    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];

    fireEvent.change(input, { target: { value: 'alice' } });
    fireEvent.click(addButton);

    expect(screen.getByTestId('responsive-dialog')).toBeInTheDocument();
    expect(screen.getByText('"Alice" is already in the list.')).toBeInTheDocument();
  });

  it('displays added members as chips', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob', 'Charlie'] },
      costItems: { items: [] },
    });
    renderWithProviders(store);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('removes a member when delete button is clicked', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob'] },
      costItems: { items: [] },
    });
    renderWithProviders(store);

    const aliceChip = screen.getByText('Alice').closest('.MuiChip-root');
    const deleteButton = aliceChip?.querySelector('[data-testid="CancelIcon"]')?.closest('svg');

    if (deleteButton) {
      fireEvent.click(deleteButton);
    }

    waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });

  it('disables NEXT button when no members are added', () => {
    const store = createMockStore();
    renderWithProviders(store);

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('enables NEXT button when at least one member is added', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice'] },
      costItems: { items: [] },
    });
    renderWithProviders(store);

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it('navigates back when BACK button is clicked', () => {
    const store = createMockStore();
    renderWithProviders(store);

    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    expect(mockNavigateBack).toHaveBeenCalledTimes(1);
  });

  it('navigates to cost items page when NEXT button is clicked', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice'] },
      costItems: { items: [] },
    });
    renderWithProviders(store);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockNavigateToCostItemsPage).toHaveBeenCalledTimes(1);
  });

  it('clears error when user starts typing after an error', () => {
    const store = createMockStore();
    renderWithProviders(store);

    const input = screen.getByLabelText('Person Name');
    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];

    // Trigger error by clicking add with empty input
    fireEvent.click(addButton);
    expect(screen.getByText('The field cannot be empty')).toBeInTheDocument();

    // Start typing
    fireEvent.change(input, { target: { value: 'A' } });

    // Error should be cleared
    expect(screen.queryByText('The field cannot be empty')).not.toBeInTheDocument();
  });
});
