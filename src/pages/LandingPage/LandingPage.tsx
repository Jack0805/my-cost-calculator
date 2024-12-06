import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { SiteHeader, SiteFooter } from "../../components";
import {
  LandingPageWrapper,
  LandingContentWrapper,
  CardWrapper,
  ImageWrapper,
} from "./index";

import billSplittingAppDiscussion from "../../assets/images/bill-splitting-app-discussion.webp";
import splitBillsGroupExpenses from "../../assets/images/split-bills-group-expenses.webp";
import friendlyBillSharingApp from "../../assets/images/friendly-bill-sharing-app.webp";
import teamBillSplittingSolution from "../../assets/images/team-bill-splitting-solution.webp";
import groupExpenseManagementApp from "../../assets/images/group-expense-management-app.webp";
import modernBillSharingIllustration from "../../assets/images/modern-bill-sharing-illustration.webp";
import splitBillWebTool from "../../assets/images/split-bill-web-tool.webp";

import { Helmet } from "react-helmet";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { persistor } from "../../store/store";

import { removeItem } from "../../store/costItemsSlice";
import { removeMember } from "../../store/groupMembersSlice";
import { ResponsiveDialog } from "../../components/";

export const LandingPage: React.FC = () => {
  const { navigateToGroupMemberPage } = useNavigateTo();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const names = useAppSelector((state) => state.groupMember.names);
  const items = useAppSelector((state) => state.costItems.items);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const hasData = names.length > 0 || items.length > 0;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const images = [
    billSplittingAppDiscussion,
    splitBillsGroupExpenses,
    friendlyBillSharingApp,
    teamBillSplittingSolution,
    groupExpenseManagementApp,
    modernBillSharingIllustration,
    splitBillWebTool,
  ];

  const altTexts = [
    "Group discussing a bill-splitting app",
    "Splitting group expenses using a mobile app",
    "Friendly collaboration for bill sharing",
    "Team using a solution for splitting bills",
    "Managing group expenses easily",
    "Modern illustration of a bill-sharing app",
    "Simple Split bill web app",
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];
  const selectedAltText = altTexts[randomIndex];

  return (
    <LandingPageWrapper>
      <Helmet>
        <title>Bill Split: Split Bills Effortlessly</title>
        <meta
          name="description"
          content="Simplify group expenses with Bill Split. Easily divide costs, track spending, and ensure fair sharing among friends and family."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Bill Split",
            url: "https://billsplit.io",
            description:
              "Split bills easily and manage group expenses effortlessly with Bill Split.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            author: {
              "@type": "Organization",
              name: "Bill Split Team",
            },
            offers: {
              "@type": "Offer",
              price: "0.00",
              priceCurrency: "USD",
            },
          })}
        </script>
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
          {hasData && (
            <Alert variant="outlined" severity="success">
              Your previous data is saved. Click 'Continue' to resume or 'Start
              New Calculation' to clear the data and begin fresh.
            </Alert>
          )}
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
            {hasData && (
              <Button
                aria-label={"Start Splitting Bills"}
                variant="outlined"
                color="primary"
                onClick={() => navigateToGroupMemberPage()}
              >
                Continue
              </Button>
            )}

            <Button
              aria-label={"Start Splitting Bills"}
              variant="contained"
              color="primary"
              onClick={() =>
                hasData ? handleClickOpen() : navigateToGroupMemberPage()
              }
            >
              Start New Calculation
            </Button>
          </CardActions>
        </CardWrapper>
        <ImageWrapper>
          <img
            src={selectedImage}
            alt={selectedAltText}
            title={selectedAltText}
            style={{ width: "100%", height: "auto", margin: "20px 0" }}
            loading="lazy"
          />
        </ImageWrapper>
      </LandingContentWrapper>
      <SiteFooter />
      <ResponsiveDialog
        title="Are You Sure You Want to Start a New Calculation?"
        description="Starting a new calculation will permanently delete all your current data and it cannot be recovered. Please ensure you no longer need this data, or you can download the results as a PDF for your records before proceeding."
        fullScreen={false}
        open={open}
        handleClose={handleClose}
        showContinueButton
        handleContinue={() => {
          dispatch(removeItem());
          dispatch(removeMember());
          persistor.purge();
          navigateToGroupMemberPage();
        }}
        CloseButtonName="No"
      />
    </LandingPageWrapper>
  );
};
