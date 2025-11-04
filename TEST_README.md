# Test Suite Documentation

## Overview

Comprehensive unit tests have been created for all page components in the `src/pages/` folder using React Testing Library and Jest.

## Test Files Created

1. **PageNotFound.test.tsx** - Tests for the 404 page component
2. **Faq.test.tsx** - Tests for the FAQ page component
3. **LandingPage.test.tsx** - Tests for the landing/home page
4. **GroupMemberPage.test.tsx** - Tests for the group member addition page
5. **CostItemsPage.test.tsx** - Tests for the cost items/expenses page
6. **CalculationPage.test.tsx** - Tests for the results/calculation page

## Running Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm test -- --watch
```

To run tests with coverage:

```bash
npm test -- --coverage --watchAll=false
```

## Test Coverage

Each test file includes comprehensive coverage for:

### PageNotFound Component
- Component renders without crashing
- Displays 404 heading and error message
- Shows link to navigate back to home
- Displays 404 image with proper attributes

### FaqPage Component
- Renders header, footer, and page title
- Displays all FAQ items from JSON data
- Renders correct number of accordions
- Questions are displayed in bold format

### LandingPage Component
- Renders with and without saved data
- Shows appropriate buttons based on state (Continue vs Start New)
- Alert message displays when data exists
- Navigation functionality works correctly
- Confirmation dialog appears when resetting with saved data
- Image displays with proper lazy loading

### GroupMemberPage Component
- Renders stepper at correct step (Step 0)
- Input field and add button functionality
- Name capitalization works correctly
- Error handling for empty names
- Duplicate name detection with dialog
- Member chips display and delete functionality
- NEXT button disabled when no members added
- Navigation works correctly

### CostItemsPage Component
- Renders stepper at correct step (Step 1)
- All input fields render (Bill Name, Amount, Paid By)
- Paid By dropdown populates with member names
- Error validation for empty fields
- Cost items are added correctly
- Input fields clear after adding
- Items display as accordions
- Equal/Unequal split toggle functionality
- Error chip shows when portions don't match amount
- NEXT button disabled with errors or no items
- Confirmation dialog on BACK with items

### CalculationPage Component
- Renders stepper at correct step (Step 2)
- Settlement table displays with participant names
- All navigation buttons render (BACK, Download PDF, Reset)
- Toggle between detailed and simplified settlement views
- Debt calculations display correctly
- PDF generation functionality (mocked)
- Reset confirmation dialog
- Data clearing and navigation on reset
- Handles empty state gracefully

## Mocking Strategy

The tests use mocking for:

1. **Components**: SiteHeader, SiteFooter, CustomizedSteppers, ResponsiveDialog, ToggleButtons
2. **Hooks**: useNavigateTo navigation functions
3. **Redux Store**: Configured with real reducers but test data
4. **External Libraries**: jsPDF, html2canvas for PDF generation
5. **Utilities**: Analytics tracking, persistor

## Known Issues

### Node Version Compatibility

If you encounter errors related to optional chaining syntax (`?.`) in dependencies:

```
SyntaxError: Unexpected token .
```

This is due to Node v10 not supporting modern JavaScript syntax. Solutions:

1. **Upgrade Node** (Recommended):
   ```bash
   # Using nvm
   nvm install 16
   nvm use 16
   ```

2. **Update dependencies**: Ensure all packages are compatible versions

3. **Configure Jest**: Add transformIgnorePatterns to package.json if needed

## Test Structure

All tests follow a consistent pattern:

```typescript
describe('ComponentName Component', () => {
  beforeEach(() => {
    // Setup and mock clearing
  });

  it('describes what the test does', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Best Practices Used

1. **Redux Provider Wrapping**: All components that use Redux are wrapped with Provider
2. **Router Wrapping**: Components using routing are wrapped with BrowserRouter
3. **Mock Store Creation**: Helper function creates configurable mock stores
4. **Isolation**: Each test is independent with beforeEach cleanup
5. **Descriptive Test Names**: Clear descriptions of what each test validates
6. **Accessibility**: Uses proper ARIA labels and roles for queries
7. **Async Handling**: Uses waitFor for asynchronous operations

## Future Improvements

Potential enhancements:

1. Add integration tests for complete user flows
2. Add snapshot testing for component rendering
3. Test keyboard navigation and accessibility
4. Add performance testing
5. Test error boundary behavior
6. Add E2E tests with Cypress or Playwright
7. Increase coverage to include edge cases
8. Test Redux state transitions more thoroughly

## Debugging Tests

To debug a specific test:

```bash
# Run a single test file
npm test -- GroupMember.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="adds a member"

# Run with verbose output
npm test -- --verbose
```

## Continuous Integration

These tests are ready for CI/CD integration:

```yaml
# Example GitHub Actions
- name: Run tests
  run: npm test -- --watchAll=false --coverage
```

## Dependencies

The test suite relies on:

- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers for DOM
- `@testing-library/user-event` - User interaction simulation
- `jest` - Test runner (included in react-scripts)
- `@reduxjs/toolkit` - For Redux store testing

All dependencies are already included in package.json.
