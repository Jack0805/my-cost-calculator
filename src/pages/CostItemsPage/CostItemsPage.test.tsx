import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { CostItemsPage } from './CostItemsPage';
import groupMembersReducer from '../../store/groupMembersSlice';
import costItemsReducer from '../../store/costItemsSlice';

// Mock the components
jest.mock('../../components', () => ({
  SiteHeader: () => <div data-testid="site-header">Header</div>,
  SiteFooter: () => <div data-testid="site-footer">Footer</div>,
  CustomizedSteppers: ({ currentStep }: any) => <div data-testid="stepper">Step {currentStep}</div>,
  ToggleButtons: ({ alignment, handleChangeAlignment, itemIndex }: any) => (
    <div data-testid="toggle-buttons">
      <button onClick={() => handleChangeAlignment('equal', itemIndex)}>Equal</button>
      <button onClick={() => handleChangeAlignment('unequal', itemIndex)}>Unequal</button>
    </div>
  ),
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
const mockNavigateBack = jest.fn();
const mockNavigateToCalculationPage = jest.fn();
jest.mock('../../hooks/', () => ({
  useNavigateTo: () => ({
    navigateBack: mockNavigateBack,
    navigateToCalculationPage: mockNavigateToCalculationPage,
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

describe('CostItemsPage Component', () => {
  const defaultState = {
    groupMember: { names: ['Alice', 'Bob', 'Charlie'] },
    costItems: { items: [] },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (store: any) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <CostItemsPage />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders without crashing', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);
    expect(screen.getByText('Step 2. Add Costs')).toBeInTheDocument();
  });

  it('renders SiteHeader, SiteFooter, and Stepper', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);
    expect(screen.getByTestId('site-header')).toBeInTheDocument();
    expect(screen.getByTestId('site-footer')).toBeInTheDocument();
    expect(screen.getByTestId('stepper')).toBeInTheDocument();
  });

  it('displays the correct step in the stepper', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders bill name input field', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);
    expect(screen.getByLabelText('Bill Name')).toBeInTheDocument();
  });

  it('renders amount input field', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });

  it('renders paid by select dropdown', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);
    expect(screen.getByLabelText('Paid By')).toBeInTheDocument();
  });

  it('populates paid by dropdown with member names', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const select = screen.getByLabelText('Paid By');
    fireEvent.mouseDown(select);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('shows error when trying to add item without bill name', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];
    const amountInput = screen.getByLabelText('Amount');

    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(addButton);

    expect(screen.getByText('The field cannot be empty')).toBeInTheDocument();
  });

  it('shows error when trying to add item without amount', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];
    const billNameInput = screen.getByLabelText('Bill Name');

    fireEvent.change(billNameInput, { target: { value: 'Dinner' } });
    fireEvent.click(addButton);

    expect(screen.getByText('The field cannot be empty')).toBeInTheDocument();
  });

  it('adds a cost item when valid data is entered', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const billNameInput = screen.getByLabelText('Bill Name');
    const amountInput = screen.getByLabelText('Amount');
    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];

    fireEvent.change(billNameInput, { target: { value: 'Dinner' } });
    fireEvent.change(amountInput, { target: { value: '150' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/dinner.*150.*paid by alice/i)).toBeInTheDocument();
  });

  it('clears input fields after adding an item', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const billNameInput = screen.getByLabelText('Bill Name') as HTMLInputElement;
    const amountInput = screen.getByLabelText('Amount') as HTMLInputElement;
    const addButton = screen.getAllByLabelText('Start Splitting Bills')[0];

    fireEvent.change(billNameInput, { target: { value: 'Dinner' } });
    fireEvent.change(amountInput, { target: { value: '150' } });
    fireEvent.click(addButton);

    expect(billNameInput.value).toBe('');
    expect(amountInput.value).toBe('');
  });

  it('displays added cost items as accordions', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob'] },
      costItems: {
        items: [
          {
            itemName: 'Dinner',
            amount: 100,
            paidBy: 'Alice',
            equalSplit: 'equal',
            accordionExpended: true,
            shareBy: [
              { name: 'Alice', isShared: true, portion: 50 },
              { name: 'Bob', isShared: true, portion: 50 },
            ],
          },
        ],
      },
    });
    renderWithProviders(store);

    expect(screen.getByText(/dinner.*100.*paid by alice/i)).toBeInTheDocument();
  });

  it('disables NEXT button when no items are added', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const nextButton = screen.getByText('NEXT');
    expect(nextButton).toBeDisabled();
  });

  it('enables NEXT button when valid items are added', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob'] },
      costItems: {
        items: [
          {
            itemName: 'Dinner',
            amount: 100,
            paidBy: 'Alice',
            equalSplit: 'equal',
            accordionExpended: true,
            shareBy: [
              { name: 'Alice', isShared: true, portion: 50 },
              { name: 'Bob', isShared: true, portion: 50 },
            ],
          },
        ],
      },
    });
    renderWithProviders(store);

    const nextButton = screen.getByText('NEXT');
    expect(nextButton).not.toBeDisabled();
  });

  it('disables NEXT button when items have portion errors', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob'] },
      costItems: {
        items: [
          {
            itemName: 'Dinner',
            amount: 100,
            paidBy: 'Alice',
            equalSplit: 'unequal',
            accordionExpended: true,
            shareBy: [
              { name: 'Alice', isShared: true, portion: 40 },
              { name: 'Bob', isShared: true, portion: 50 },
            ],
          },
        ],
      },
    });
    renderWithProviders(store);

    const nextButton = screen.getByText('NEXT');
    expect(nextButton).toBeDisabled();
  });

  it('shows error chip when portions do not match amount in unequal split', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob'] },
      costItems: {
        items: [
          {
            itemName: 'Dinner',
            amount: 100,
            paidBy: 'Alice',
            equalSplit: 'unequal',
            accordionExpended: true,
            shareBy: [
              { name: 'Alice', isShared: true, portion: 40 },
              { name: 'Bob', isShared: true, portion: 50 },
            ],
          },
        ],
      },
    });
    renderWithProviders(store);

    expect(screen.getByText('Amounts must match the bill total')).toBeInTheDocument();
  });

  it('navigates back when BACK button is clicked with no items', () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const backButton = screen.getByText('BACK');
    fireEvent.click(backButton);

    expect(mockNavigateBack).toHaveBeenCalledTimes(1);
  });

  it('shows confirmation dialog when BACK button is clicked with items', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob'] },
      costItems: {
        items: [
          {
            itemName: 'Dinner',
            amount: 100,
            paidBy: 'Alice',
            equalSplit: 'equal',
            accordionExpended: true,
            shareBy: [
              { name: 'Alice', isShared: true, portion: 50 },
              { name: 'Bob', isShared: true, portion: 50 },
            ],
          },
        ],
      },
    });
    renderWithProviders(store);

    const backButton = screen.getByText('BACK');
    fireEvent.click(backButton);

    expect(screen.getByTestId('responsive-dialog')).toBeInTheDocument();
    expect(screen.getByText('Are You Sure You Want to Go Back?')).toBeInTheDocument();
  });

  it('navigates to calculation page when NEXT button is clicked', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob'] },
      costItems: {
        items: [
          {
            itemName: 'Dinner',
            amount: 100,
            paidBy: 'Alice',
            equalSplit: 'equal',
            accordionExpended: true,
            shareBy: [
              { name: 'Alice', isShared: true, portion: 50 },
              { name: 'Bob', isShared: true, portion: 50 },
            ],
          },
        ],
      },
    });
    renderWithProviders(store);

    const nextButton = screen.getByText('NEXT');
    fireEvent.click(nextButton);

    expect(mockNavigateToCalculationPage).toHaveBeenCalledTimes(1);
  });

  it('displays toggle buttons for equal/unequal split', () => {
    const store = createMockStore({
      groupMember: { names: ['Alice', 'Bob'] },
      costItems: {
        items: [
          {
            itemName: 'Dinner',
            amount: 100,
            paidBy: 'Alice',
            equalSplit: 'equal',
            accordionExpended: true,
            shareBy: [
              { name: 'Alice', isShared: true, portion: 50 },
              { name: 'Bob', isShared: true, portion: 50 },
            ],
          },
        ],
      },
    });
    renderWithProviders(store);

    expect(screen.getByTestId('toggle-buttons')).toBeInTheDocument();
  });
});
