import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  LandingPage,
  CostItemsPage,
  GroupMemberPage,
  CalculationPage,
  PageNotFound,
} from "./pages/"; // Your Home component
import { ROUTE } from "./shared";
import { initializeGA, trackPageView } from "./utils/analytics";

const AppRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics when the app loads
    initializeGA();

    // Track the initial page view
    trackPageView(location.pathname + location.search);
  }, []);

  useEffect(() => {
    // Track page views when the route changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  // Check for `redirect` parameter in the query string
  const redirectPath = new URLSearchParams(location.search).get("redirect");

  if (redirectPath) {
    // Render the PageNotFound component for redirected paths
    return <PageNotFound />;
  }

  return (
    <Routes>
      <Route path={ROUTE.LANDING_PAGE} element={<LandingPage />} />
      <Route path={ROUTE.COST_ITEMS} element={<CostItemsPage />} />
      <Route path={ROUTE.GROUP_MEMBER} element={<GroupMemberPage />} />
      <Route path={ROUTE.CALCULATION} element={<CalculationPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
