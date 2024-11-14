import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import {
  LandingPage,
  CostItemsPage,
  GroupMemberPage,
  CalculationPage,
} from "./pages/"; // Your Home component
import { ROUTE } from "./shared";

const App_Routes: React.FC = () => {
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
