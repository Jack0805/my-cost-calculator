import React from "react";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { SiteHeader, SiteFooter } from "../../components";
import {
  LandingPageWrapper,
  LandingContentWrapper,
  CardWrapper,
  ImageWrapper,
} from "./index";
import landingPageImage from "../../assets/images/landing-page-image.webp";

import { Helmet } from "react-helmet";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const LandingPage: React.FC = () => {
  const { navigateToGroupMemberPage } = useNavigateTo();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
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
      <LandingContentWrapper>
        <CardWrapper>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Introducing:
            </Typography>
            <Typography variant={isLargeScreen ? "h1" : "h3"} component="div">
              Bill Split
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              100% free to use
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: isLargeScreen ? 20 : 15 }}
            >
              Easily splitting bills with friends using BillSplit.io
              <br />
              {'"with Just Simple 3 steps"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              aria-label={"Start Splitting Bills"}
              variant="contained"
              color="primary"
              onClick={() => navigateToGroupMemberPage()}
            >
              Start Splitting Bills
            </Button>
          </CardActions>
        </CardWrapper>
        <ImageWrapper>
          <img
            src={landingPageImage}
            alt="Illustration of people splitting bills"
            style={{ width: "100%", height: "auto", margin: "20px 0" }}
          />
        </ImageWrapper>
      </LandingContentWrapper>
      <SiteFooter />
    </LandingPageWrapper>
  );
};
