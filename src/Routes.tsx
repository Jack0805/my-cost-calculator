import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  LandingPage,
  CostItemsPage,
  GroupMemberPage,
  CalculationPage,
} from "./pages/"; // Your Home component
import { ROUTE } from "./shared";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-DCKDBTH135";

// Custom hook to track page views
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);
};

const App_Routes: React.FC = () => {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID); // Initialize Google Analytics
  }, []);
  usePageTracking();
  return (
    <Routes>
      <Route path={ROUTE.LANDING_PAGE} element={<LandingPage />} />
      <Route path={ROUTE.COST_ITEMS} element={<CostItemsPage />} />
      <Route path={ROUTE.GROUP_MEMBER} element={<GroupMemberPage />} />
      <Route path={ROUTE.CALCULATION} element={<CalculationPage />} />
    </Routes>
  );
};

export default App_Routes;
