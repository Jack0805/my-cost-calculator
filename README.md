# BillSplit.io

A free, client-side bill-splitting web application that helps groups fairly divide shared expenses. Calculate who owes whom with support for both equal and custom splits, and get the simplest settlement plan to minimize transactions.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/MUI-6.1.4-blue.svg)](https://mui.com/)

## Features

- **3-Step Process**: Add participants → Enter expenses → View settlement results
- **Flexible Splitting**: Support for both equal and custom portion splits
- **Smart Settlement**: Generates simplified settlement plan with minimum transactions
- **Detailed View**: Shows complete debt matrix between all participants
- **PDF Export**: Download settlement results as a PDF
- **Offline-First**: All data stored locally using Redux Persist
- **No Backend Required**: Runs entirely in the browser
- **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI (MUI)
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router v6
- **Build Tool**: Create React App
- **PDF Generation**: jsPDF + html2canvas
- **Analytics**: Google Analytics 4
- **Deployment**: GitHub Pages with static prerendering

## Getting Started

### Prerequisites

- Node.js 16+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-cost-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Development

### Project Structure

```
src/
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── pages/            # Page components
│   ├── LandingPage/
│   ├── GroupMemberPage/
│   ├── CostItemsPage/
│   ├── CalculationPage/
│   ├── FaqPage/
│   └── PageNotFound/
├── store/            # Redux store and slices
├── utils/            # Helper functions and utilities
├── shared/           # Shared constants and types
└── Routes.tsx        # Route definitions

scripts/
└── prerender.js      # Static HTML generation for SEO
```

### Key Concepts

#### State Management

The app uses Redux Toolkit with two main slices:

- **`groupMembersSlice`**: Manages participant names
- **`costItemsSlice`**: Manages expenses with split configurations

All state is automatically persisted to `localStorage` via Redux Persist.

#### Calculation Algorithm

The core calculation logic in `src/utils/helpers.ts` includes:

1. **`calculateDetailedDebts()`**: Computes all person-to-person debts
2. **`simplifySettlement()`**: Optimizes settlement using greedy matching algorithm to minimize transactions
3. **`convertDebts()`**: Transforms debts into matrix format for display

### Available Scripts

#### Development
```bash
npm start                 # Start development server
```

#### Testing
```bash
npm test                  # Run tests in watch mode
npm test -- --watchAll=false  # Run tests once
npm test -- --coverage    # Run tests with coverage report
```

#### Building
```bash
npm run build            # Create production build
npm run build:static     # Build + prerender for SEO
npm run prerender        # Run static prerendering only
```

#### Deployment
```bash
npm run deploy           # Deploy to GitHub Pages
```

## Testing

The project includes comprehensive unit tests for all page components using React Testing Library and Jest.

### Running Tests

```bash
# Run all tests in watch mode
npm test

# Run all tests once (CI mode)
npm test -- --watchAll=false

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Run specific test file
npm test -- GroupMember.test.tsx
```

### Test Coverage

- **76 unit tests** covering all page components
- Tests include component rendering, user interactions, Redux state management, navigation, and validation
- All tests use proper mocking for external dependencies (jsPDF, html2canvas, analytics)

See [TEST_README.md](TEST_README.md) for detailed testing documentation.

## Building for Production

### Standard Build

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Static Build (with SEO)

```bash
npm run build:static
```

This command:
1. Creates a production build
2. Prerenders all routes using Puppeteer for better SEO
3. Generates static HTML files for each route

The prerendering process:
- Starts a local server serving the build folder
- Uses headless Chrome to visit each route
- Captures the fully rendered HTML
- Saves static HTML files to improve initial load time and SEO

## Deployment

### GitHub Pages

The project is configured to deploy to GitHub Pages:

```bash
npm run deploy
```

This will:
1. Run `build:static` to create optimized and prerendered build
2. Deploy the `build/` folder to the `gh-pages` branch
3. Make the site available at your GitHub Pages URL

### Manual Deployment

You can deploy the `build/` folder to any static hosting service:

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your repository
- **AWS S3**: Upload the `build` folder
- **Firebase Hosting**: Use Firebase CLI

## Configuration

### Google Analytics

Update the Measurement ID in `src/utils/analytics.ts`:

```typescript
const MEASUREMENT_ID = 'G-YOUR-ID';
```

### Google AdSense

Update the publisher ID in public/index.html:

```html
<meta name="google-adsense-account" content="ca-pub-YOUR-ID">
```

### Homepage URL

Update `homepage` in `package.json` for deployment:

```json
{
  "homepage": "."  // For relative paths (current)
  // or
  "homepage": "https://yourdomain.com"  // For custom domain
}
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome on Android)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow existing code style and patterns
- Update documentation as needed
- Ensure all tests pass before submitting PR

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- UI components from [Material-UI](https://mui.com/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)
- Icons from [Material Icons](https://mui.com/material-ui/material-icons/)

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Made with ❤️ for easier bill splitting among friends
