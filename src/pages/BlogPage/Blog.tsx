import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { SiteFooter, SiteHeader } from "../../components";
import { PageWrapper } from "./Blog.styles";
import { BLOG_ARTICLES } from "./Blog.constants";

export const BlogPage = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>Bill Splitting Tips & Guides - BillSplit.io Blog</title>
        <meta
          name="description"
          content="Learn tips, strategies, and best practices for splitting bills, managing group expenses, and settling debts fairly with friends and roommates."
        />
        <meta
          name="keywords"
          content="bill splitting tips, expense sharing guide, group finances, roommate expenses, trip budgeting"
        />
        <link rel="canonical" href="https://billsplit.io/blog/" />
      </Helmet>

      <SiteHeader />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Bill Splitting Tips & Guides
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Expert advice on managing shared expenses, splitting bills fairly, and
          simplifying group finances
        </Typography>

        <Grid container spacing={4}>
          {BLOG_ARTICLES.map((article, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {article.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Published: {article.date}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
                >
                  {article.content}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, p: 4, bgcolor: "grey.100", borderRadius: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Ready to Split Bills the Smart Way?
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Use our free bill splitting calculator to manage your group expenses
            easily and fairly. No registration required - start calculating now!
          </Typography>
        </Box>
      </Container>

      <SiteFooter />
    </PageWrapper>
  );
};
