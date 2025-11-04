# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BillSplit.io - A bill-splitting React application that calculates fair expense sharing among groups. The app runs entirely client-side with Redux state persisted to localStorage.

## Development Commands

```bash
# Development
yarn start              # Start dev server at http://localhost:3000

# Building
yarn build             # Create optimized production bundle
yarn build:static      # Build + prerender all routes for SEO
yarn prerender         # Run static prerendering (requires build first)

# Deployment
yarn deploy            # Deploy to GitHub Pages (runs build:static first)
```

## Architecture Overview

### 3-Step User Flow

The application guides users through a stepper workflow:

1. **GroupMemberPage** (`/group-member`) - Add participant names
2. **CostItemsPage** (`/cost-items`) - Enter expenses with split configurations
3. **CalculationPage** (`/calculation`) - View settlement results

Each step stores data in Redux, which persists to localStorage via Redux Persist.

### State Management

**Two Redux Slices:**

- **`groupMembersSlice`**: Manages participant names as `string[]`
- **`costItemsSlice`**: Manages expenses with complex sharing logic

**Key Type: `CostItem`**
```typescript
{
  itemName: string          // "Dinner"
  amount?: number           // 100.00
  shareBy: ShareBy[]        // Who shares this cost
  paidBy: string            // Who paid initially
  equalSplit: "equal" | "unequal"
}
```

**State Persistence:**
- All Redux state auto-persists to `localStorage` with key `"root"`
- To fully clear data, must call both slice actions AND `persistor.purge()`
- See [LandingPage.tsx:407-411](src/pages/LandingPage/LandingPage.tsx#L407-L411) for reset pattern

### Core Calculation Logic

All debt calculation happens in [src/utils/helpers.ts](src/utils/helpers.ts). Key functions:

1. **`filterSharedItems()`** - Remove non-participating members from items
2. **`calculateDetailedDebts()`** - Compute all person-to-person debts (handles equal & unequal splits)
3. **`convertDebts()`** - Transform into matrix format for table display
4. **`simplifySettlement()`** - **Critical algorithm** that minimizes transactions using greedy matching

The calculation flow in CalculationPage:
```typescript
const result = convertDebts(
  calculateDetailedDebts(filterSharedItems(items)),
  names
);
const simpleResult = simplifySettlement(transformToResults(result));
```

### Static Prerendering

The build process uses Puppeteer to prerender all routes for SEO:

- Script: [scripts/prerender.js](scripts/prerender.js)
- Starts local server serving `/build`, visits each route, saves rendered HTML
- Routes: `/`, `/cost-items`, `/group-member`, `/calculation`, `/faq`
- Required for Google AdSense verification and improved SEO

## Key Patterns & Gotchas

### Navigation

Use typed navigation hooks from `useNavigateTo()` instead of raw `navigate()`:
```typescript
const { navigateToGroupMemberPage, navigateBack } = useNavigateTo();
```

### Validation Rules

**GroupMemberPage:**
- No duplicate names allowed
- At least 1 member required to proceed

**CostItemsPage:**
- For unequal splits: sum of portions must equal item amount (tolerance: ±0.02)
- Both item name and amount required
- See [CostItemsPage.tsx:82-89](src/pages/CostItemsPage/CostItemsPage.tsx#L82-L89) for validation logic

### Redux Action Patterns

**Updating share status:**
```typescript
dispatch(updateItem({ itemIndex, shareByIndex, isShared }));
```

**Updating portions for unequal splits:**
```typescript
dispatch(updatePortion({ itemIndex, shareByIndex, portion }));
```

### PDF Generation

The PDF export feature ([CalculationPage.tsx:166-250](src/pages/CalculationPage/CalculationPage.tsx#L166-L250)):
- Uses `html2canvas` to render table → canvas
- Uses `jsPDF` to create landscape PDF
- Opens PDF in new window instead of downloading
- Tracks event via Google Analytics

### Analytics

Google Analytics (GA4) is integrated via `react-ga4`:
- Measurement ID: `G-DCKDBTH135`
- Auto-tracks page views on route changes (see [Routes.tsx:29-40](src/Routes.tsx#L29-L40))
- Manual event tracking available via `trackEvent()` utility

## File Organization

```
src/
├── store/
│   ├── store.ts                    # Redux config with persistence
│   ├── costItemsSlice.ts          # Cost item state
│   ├── groupMembersSlice.ts       # Member state
│   └── types.ts                   # TypeScript types
├── utils/
│   ├── helpers.ts                 # Core calculation algorithms
│   └── analytics.ts               # GA4 wrapper
├── pages/
│   ├── LandingPage/
│   ├── GroupMemberPage/
│   ├── CostItemsPage/
│   ├── CalculationPage/
│   ├── FaqPage/
│   └── PageNotFound/
├── components/                    # Reusable UI components
├── hooks/
│   └── useNavigateTo/            # Typed navigation
├── shared/
│   └── shared.constants.ts       # Route enum
└── Routes.tsx                     # Route definitions + GA tracking

scripts/
└── prerender.js                   # Static HTML generation
```

## Component Styling

Uses a mix of:
- **Styled Components** for custom page wrappers
- **Material-UI** for UI components
- **Emotion** (MUI's styling engine)

Typical pattern:
```typescript
// PageName.tsx
import { PageWrapper } from "./PageName.styles";

// PageName.styles.ts or index.ts
export const PageWrapper = styled.div`
  /* styles */
`;
```

## SEO & Meta Tags

Each page uses React Helmet for `<head>` management:
- Title, description, keywords
- Canonical URLs
- Schema.org structured data (JSON-LD)
- Google AdSense meta tag

## Testing Notes

Testing infrastructure is set up but minimal tests exist:
- Uses `@testing-library/react` and Jest
- Only [App.test.tsx](src/App.test.tsx) exists (renders without crashing)
- Run tests with standard CRA: `yarn test`

## Deployment

- Hosted on GitHub Pages
- `homepage: "."` in package.json for relative paths
- Deploy process: `yarn deploy` runs `build:static` then `gh-pages -d build`
