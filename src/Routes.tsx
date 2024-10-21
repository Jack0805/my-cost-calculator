import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage, CostItemsPage, GroupMemberPage } from './pages/'; // Your Home component
import { ROUTE } from './shared'

const App_Routes: React.FC = () => {
  return (
        <Routes>
            <Route path={ROUTE.LANDING_PAGE} element={<LandingPage />} />
            <Route path={ROUTE.COST_ITEMS} element={<CostItemsPage />} />
            <Route path={ROUTE.GROUP_MEMBER} element={<GroupMemberPage />} />
        </Routes>
  );
};

export default App_Routes;
