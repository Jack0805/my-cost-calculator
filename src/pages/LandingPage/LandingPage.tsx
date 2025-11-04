import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

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
          name="google-adsense-account"
          content="ca-pub-5022597811159483"
        ></meta>
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

      {/* SEO-friendly content section */}
      <Container maxWidth="lg" sx={{ py: 6, bgcolor: "#f5f5f5" }}>
        {/* How It Works Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            How It Works - Just 3 Simple Steps
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  color="primary"
                >
                  1. Add Group Members
                </Typography>
                <Typography variant="body1">
                  Start by adding all the people in your group who will be
                  sharing expenses. Simply enter their names - no registration
                  or login required.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  color="primary"
                >
                  2. Enter Expenses
                </Typography>
                <Typography variant="body1">
                  Add each expense by specifying who paid, the amount, and how
                  it should be split. You can split equally or customize
                  portions for each person.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  color="primary"
                >
                  3. View Settlement Plan
                </Typography>
                <Typography variant="body1">
                  Instantly see who owes whom and how much. Our smart algorithm
                  minimizes the number of transactions needed to settle all
                  debts fairly.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 6, mt: 10 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            Why Choose BillSplit.io?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography variant="h6" component="h3" sx={{ mr: 2 }}>
                  ✓
                </Typography>
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    100% Free Forever
                  </Typography>
                  <Typography variant="body2">
                    No hidden fees, no premium features, no subscriptions.
                    BillSplit.io is completely free to use with unlimited
                    calculations.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography variant="h6" component="h3" sx={{ mr: 2 }}>
                  ✓
                </Typography>
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Smart Settlement Algorithm
                  </Typography>
                  <Typography variant="body2">
                    Our intelligent algorithm calculates the minimum number of
                    transactions needed to settle all debts, saving time and
                    reducing confusion.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography variant="h6" component="h3" sx={{ mr: 2 }}>
                  ✓
                </Typography>
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Privacy First
                  </Typography>
                  <Typography variant="body2">
                    All calculations happen in your browser. Your data is stored
                    locally on your device and never sent to our servers.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography variant="h6" component="h3" sx={{ mr: 2 }}>
                  ✓
                </Typography>
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Export to PDF
                  </Typography>
                  <Typography variant="body2">
                    Download your settlement results as a PDF for easy sharing
                    with your group or for keeping records.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Use Cases Section */}
        <Box>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            Perfect For Any Shared Expense
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={1}
                sx={{ p: 2, textAlign: "center", bgcolor: "white" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  🍽️ Restaurant Bills
                </Typography>
                <Typography variant="body2">
                  Split dinner costs fairly among friends
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={1}
                sx={{ p: 2, textAlign: "center", bgcolor: "white" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  ✈️ Group Trips
                </Typography>
                <Typography variant="body2">
                  Manage vacation expenses effortlessly
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={1}
                sx={{ p: 2, textAlign: "center", bgcolor: "white" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  🏠 Roommate Expenses
                </Typography>
                <Typography variant="body2">
                  Divide rent and household costs
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={1}
                sx={{ p: 2, textAlign: "center", bgcolor: "white" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  🎉 Event Planning
                </Typography>
                <Typography variant="body2">
                  Split party and event costs easily
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Ready to Split Bills the Smart Way?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Join thousands of users who trust BillSplit.io for fair and easy
            expense sharing.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() =>
              hasData ? handleClickOpen() : navigateToGroupMemberPage()
            }
          >
            Start Splitting Now - It's Free!
          </Button>
        </Box>
      </Container>

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
