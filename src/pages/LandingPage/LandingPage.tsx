import React from 'react';
import Button from '@mui/material/Button';
import { useNavigateTo } from '../../hooks/';

export const LandingPage: React.FC = () => {

  const { navigateToGroupMemberPage } = useNavigateTo();

  return (
      <>
        <Button variant="contained" color="primary" onClick={() => navigateToGroupMemberPage()}>
            Start Calculation
        </Button>
      </>
  );
};

