import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { Helmet } from 'react-helmet';
import { SiteFooter, SiteHeader } from '../../components';
import { PageWrapper } from './About.styles';

export const AboutPage = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>About BillSplit.io - Free Bill Splitting Tool</title>
        <meta
          name="description"
          content="Learn about BillSplit.io, the free online bill splitting calculator that helps friends and groups fairly divide expenses and settle debts with ease."
        />
        <meta
          name="keywords"
          content="about billsplit, bill splitting tool, expense sharing, split bills, group expenses"
        />
        <link rel="canonical" href="https://billsplit.io/about" />
      </Helmet>

      <SiteHeader />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About BillSplit.io
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              What is BillSplit.io?
            </Typography>
            <Typography variant="body1" paragraph>
              BillSplit.io is a free, easy-to-use online bill splitting calculator designed to help friends,
              roommates, and groups fairly divide shared expenses. Whether you're splitting restaurant bills,
              shared household costs, vacation expenses, or group purchases, our tool makes it simple to
              calculate who owes what to whom.
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Why We Created BillSplit.io
            </Typography>
            <Typography variant="body1" paragraph>
              We've all been there - after a great dinner with friends or a fantastic group trip, the awkward
              moment arrives when it's time to settle the bills. Who paid for what? How much does each person
              owe? Should we split everything equally or proportionally based on what each person ordered?
            </Typography>
            <Typography variant="body1" paragraph>
              Traditional methods like mental math, spreadsheets, or calculator apps can be time-consuming and
              error-prone. We created BillSplit.io to eliminate the hassle and make bill splitting as painless
              as possible. Our smart algorithm not only calculates debts accurately but also minimizes the
              number of transactions needed to settle up.
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Key Features
            </Typography>
            <Typography variant="body1" component="div">
              <ul>
                <li><strong>Equal and Custom Splits:</strong> Choose to split bills equally among all participants
                or customize portions for each person based on what they consumed.</li>
                <li><strong>Smart Settlement Algorithm:</strong> Our intelligent algorithm calculates the minimum
                number of transactions needed to settle all debts, saving time and reducing confusion.</li>
                <li><strong>Detailed Breakdown:</strong> See exactly who owes whom and how much, with a complete
                debt matrix showing all relationships.</li>
                <li><strong>PDF Export:</strong> Download your settlement results as a PDF for easy sharing and
                record-keeping.</li>
                <li><strong>Privacy First:</strong> All calculations happen in your browser. We don't store your
                data on our servers, ensuring complete privacy.</li>
                <li><strong>100% Free:</strong> No hidden fees, no premium features, no subscriptions. BillSplit.io
                is completely free to use forever.</li>
              </ul>
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="body1" paragraph>
              Using BillSplit.io is incredibly simple and takes just three steps:
            </Typography>
            <Typography variant="body1" component="div">
              <ol>
                <li><strong>Add Participants:</strong> Enter the names of everyone in your group who will be
                sharing expenses.</li>
                <li><strong>Add Expenses:</strong> Input each bill or expense, specifying who paid and how it
                should be split (equally or with custom portions).</li>
                <li><strong>View Results:</strong> Instantly see the settlement plan showing who owes whom and
                how much, in both detailed and simplified formats.</li>
              </ol>
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Common Use Cases
            </Typography>
            <Typography variant="body1" component="div">
              <ul>
                <li><strong>Restaurant Bills:</strong> Split dinner costs among friends, accounting for shared
                appetizers and individual entrees.</li>
                <li><strong>Roommate Expenses:</strong> Divide rent, utilities, groceries, and household items
                fairly among roommates.</li>
                <li><strong>Group Trips:</strong> Manage vacation expenses like accommodation, transportation,
                meals, and activities.</li>
                <li><strong>Event Planning:</strong> Split costs for parties, weddings, or group events among
                organizers.</li>
                <li><strong>Business Expenses:</strong> Divide costs among business partners or team members for
                shared purchases.</li>
              </ul>
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Our Commitment
            </Typography>
            <Typography variant="body1" paragraph>
              We're committed to keeping BillSplit.io free, simple, and privacy-focused. We continuously work
              to improve the tool based on user feedback and ensure it remains the best free bill splitting
              calculator available online.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're splitting a quick lunch bill or managing complex group expenses over weeks,
              BillSplit.io is here to make your life easier. No more awkward money conversations, no more
              calculation errors, just fair and transparent expense sharing.
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Get Started Today
            </Typography>
            <Typography variant="body1" paragraph>
              Ready to simplify your bill splitting? Head over to our homepage and start calculating in seconds.
              No registration required, no downloads needed - just open the app and start splitting bills the
              smart way.
            </Typography>
          </Box>
        </Paper>
      </Container>

      <SiteFooter />
    </PageWrapper>
  );
};
