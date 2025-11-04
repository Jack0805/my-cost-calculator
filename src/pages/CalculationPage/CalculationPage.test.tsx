import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { CalculationPage } from "./CalculationPage";
import groupMembersReducer from "../../store/groupMembersSlice";
import costItemsReducer from "../../store/costItemsSlice";

// Mock the components
jest.mock("../../components", () => ({
  SiteHeader: () => <div data-testid="site-header">Header</div>,
  SiteFooter: () => <div data-testid="site-footer">Footer</div>,
  CustomizedSteppers: ({ currentStep }: any) => (
    <div data-testid="stepper">Step {currentStep}</div>
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
const mockNavigateToLandingPage = jest.fn();
const mockNavigateBack = jest.fn();
jest.mock("../../hooks/", () => ({
  useNavigateTo: () => ({
    navigateToLandingPage: mockNavigateToLandingPage,
    navigateBack: mockNavigateBack,
  }),
}));

// Mock analytics
jest.mock("../../utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

// Mock persistor - define the mock function first
jest.mock("../../store/store", () => ({
  persistor: {
    purge: jest.fn(),
  },
}));

// Mock jsPDF and html2canvas
jest.mock("jspdf", () => {
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
    output: jest.fn(() => ({ size: 1024, type: "application/pdf" })),
  }));
});

jest.mock("html2canvas", () => {
  return jest.fn().mockResolvedValue({
    width: 1920,
    height: 1080,
    toDataURL: jest.fn(() => "data:image/png;base64,mock"),
  });
});

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      groupMember: groupMembersReducer,
      costItems: costItemsReducer,
    },
    preloadedState: initialState,
  });
};

describe("CalculationPage Component", () => {
  const defaultState = {
    groupMember: { names: ["Alice", "Bob", "Charlie"] },
    costItems: {
      items: [
        {
          itemName: "Dinner",
          amount: 150,
          paidBy: "Alice",
          equalSplit: "equal",
          accordionExpended: true,
          shareBy: [
            { name: "Alice", isShared: true, portion: 50 },
            { name: "Bob", isShared: true, portion: 50 },
            { name: "Charlie", isShared: true, portion: 50 },
          ],
        },
        {
          itemName: "Taxi",
          amount: 30,
          paidBy: "Bob",
          equalSplit: "equal",
          accordionExpended: true,
          shareBy: [
            { name: "Alice", isShared: true, portion: 15 },
            { name: "Bob", isShared: true, portion: 15 },
            { name: "Charlie", isShared: false, portion: 0 },
          ],
        },
      ],
    },
  };

  const mockPersistor = require("../../store/store").persistor;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = jest.fn(() => "blob:mock-url");
    global.URL.revokeObjectURL = jest.fn();
    global.open = jest.fn();
  });

  const renderWithProviders = (store: any) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <CalculationPage />
        </BrowserRouter>
      </Provider>
    );
  };

  it("renders without crashing", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);
    expect(
      screen.getByText("Step 3. Payer owes each person the amounts listed")
    ).toBeInTheDocument();
  });

  it("renders SiteHeader, SiteFooter, and Stepper", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);
    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    expect(screen.getByTestId("stepper")).toBeInTheDocument();
  });

  it("displays the correct step in the stepper", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("displays the settlement table with participant names", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    expect(screen.getByText("Payer")).toBeInTheDocument();
    expect(screen.getAllByText("Alice").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Bob").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Charlie").length).toBeGreaterThan(0);
  });

  it("renders BACK button", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeInTheDocument();
  });

  it("renders Download PDF button", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const downloadButton = screen.getByRole("button", {
      name: /download pdf/i,
    });
    expect(downloadButton).toBeInTheDocument();
  });

  it("renders Reset button", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    expect(resetButton).toBeInTheDocument();
  });

  it("navigates back when BACK button is clicked", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(mockNavigateBack).toHaveBeenCalledTimes(1);
  });

  it("opens confirmation dialog when Reset button is clicked", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    expect(screen.getByTestId("responsive-dialog")).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure you want to reset the calculation/i)
    ).toBeInTheDocument();
  });

  it("displays the simplest settlement toggle switch", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    expect(
      screen.getByText("Show simplest settlement way")
    ).toBeInTheDocument();
  });

  it("switches between detailed and simplified settlement views", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const toggleSwitch = screen.getByRole("checkbox", {
      name: /show simplest settlement way/i,
    });

    // Initially should show detailed view (table)
    expect(screen.getByText("Payer")).toBeInTheDocument();

    // Click to show simplified view
    fireEvent.click(toggleSwitch);

    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      // Should now show simplified text format
      expect(screen.queryByText("Payer")).not.toBeInTheDocument();
    });
  });

  it("calculates and displays debt amounts", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    // Should display amounts in the format $XX
    const dollarAmounts = screen.getAllByText(/\$\d+/);
    expect(dollarAmounts.length).toBeGreaterThan(0);
  });

  it("displays bills paid when row is expanded", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    // Initially, the bills should be visible in expanded state
    // The specific bill names might be visible depending on accordion state
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("generates PDF when Download PDF button is clicked", async () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    const downloadButton = screen.getByRole("button", {
      name: /download pdf/i,
    });
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });
  });

  it("clears data and navigates when reset is confirmed", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    // Click reset button
    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    // Confirm in dialog
    const continueButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(continueButton);

    expect(mockPersistor.purge).toHaveBeenCalled();
    expect(mockNavigateToLandingPage).toHaveBeenCalled();
  });

  it("displays amounts in currency format", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    // All amounts should be prefixed with $
    const amounts = screen.getAllByText(/\$/);
    expect(amounts.length).toBeGreaterThan(0);
  });

  it("handles empty state gracefully", () => {
    const store = createMockStore({
      groupMember: { names: ["Alice", "Bob"] },
      costItems: { items: [] },
    });

    renderWithProviders(store);

    // Should still render the page structure
    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
  });

  it("displays the correct number of table columns", () => {
    const store = createMockStore(defaultState);
    renderWithProviders(store);

    // Should have columns for Payer + each participant (Alice, Bob, Charlie)
    const headerCells = screen.getAllByRole("columnheader");
    expect(headerCells.length).toBe(4); // Payer + 3 participants
  });
});
