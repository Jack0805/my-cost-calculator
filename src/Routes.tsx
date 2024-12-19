import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  LandingPage,
  CostItemsPage,
  GroupMemberPage,
  CalculationPage,
  PageNotFound,
  FaqPage,
} from "./pages/"; // Your Home component
import { ROUTE } from "./shared";
import { initializeGA, trackPageView } from "./utils/analytics";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for redirect query parameter
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect");

    if (redirectPath) {
      // Remove the redirect parameter and navigate to the correct route
      navigate(redirectPath, { replace: true });
    }
  }, [location, navigate]);

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

  return (
    <Routes>
      <Route path={ROUTE.LANDING_PAGE} element={<LandingPage />} />
      <Route path={ROUTE.COST_ITEMS} element={<CostItemsPage />} />
      <Route path={ROUTE.GROUP_MEMBER} element={<GroupMemberPage />} />
      <Route path={ROUTE.CALCULATION} element={<CalculationPage />} />
      <Route path={ROUTE.FAQ} element={<FaqPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
