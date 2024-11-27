import React from "react";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { SiteHeader, SiteFooter } from "../../components";
import { LandingPageWrapper } from "./index";

import { Helmet } from "react-helmet";

export const LandingPage: React.FC = () => {
  const { navigateToGroupMemberPage } = useNavigateTo();
  return (
    <LandingPageWrapper>
      <Helmet>
        <title>Split Bills Effortlessly | Bill Split</title>
        <meta
          name="description"
          content="Simplify group expenses with Bill Split. Easily divide costs, track spending, and ensure fair sharing among friends and family."
        />
        <meta
          name="keywords"
          content="split bills, group expenses, bill calculator, shared expenses"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://billsplit.io/" />
      </Helmet>
      <SiteHeader />
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Introducing:
        </Typography>
        <Typography variant="h5" component="div">
          Sharing Group Bills
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          free to use
        </Typography>
        <Typography variant="body2">
          Easily split bills with friends using Split Bills
          <br />
          {'"with just simple 3 steps"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          aria-label={"Start Splitting Bills"}
          variant="contained"
          color="primary"
          onClick={() => navigateToGroupMemberPage()}
        >
          Start Sharing Bills
        </Button>
      </CardActions>
      <SiteFooter />
    </LandingPageWrapper>
  );
};
