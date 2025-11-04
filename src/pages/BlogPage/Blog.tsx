import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import { Helmet } from 'react-helmet';
import { SiteFooter, SiteHeader } from '../../components';
import { PageWrapper } from './Blog.styles';

export const BlogPage = () => {
  const articles = [
    {
      title: '10 Tips for Splitting Bills Fairly Among Friends',
      date: 'November 2024',
      content: `Splitting bills fairly doesn't have to be complicated. Here are our top 10 tips:

1. **Communicate Early**: Discuss how you'll split expenses before dining out or making group purchases.

2. **Use Technology**: Apps like BillSplit.io eliminate calculation errors and save time.

3. **Consider Individual Consumption**: For restaurant bills, account for different orders rather than always splitting equally.

4. **Round to Nearest Dollar**: Small amounts can be rounded to make payments simpler.

5. **Designate a Coordinator**: Have one person track expenses to avoid confusion.

6. **Keep Receipts**: Document all shared expenses for transparency.

7. **Settle Promptly**: Don't let debts accumulate - settle up within a few days.

8. **Be Flexible**: Sometimes exact fairness matters less than maintaining friendships.

9. **Use Digital Payment Methods**: Venmo, PayPal, or bank transfers make settling quick and easy.

10. **Review Together**: Before settling, review the calculation with everyone to ensure agreement.`,
    },
    {
      title: 'The Mathematics Behind Fair Bill Splitting',
      date: 'October 2024',
      content: `Ever wondered how bill splitting calculators work? Let's explore the math:

**Equal Splitting**
The simplest case: Total amount ÷ Number of people = Amount per person

**Proportional Splitting**
When people consume different amounts, we calculate individual shares based on what each person ordered or used.

**Debt Minimization Algorithm**
This is where it gets interesting. Instead of having everyone pay the person who covered the bill, we use a graph theory approach to minimize transactions.

For example, if Alice owes Bob $10, Bob owes Charlie $10, and Charlie owes Alice $5, instead of making 3 transactions, we can settle everything with just one: Bob pays Charlie $10, and Alice pays Charlie $5.

Our algorithm uses a greedy matching approach:
1. Calculate net balances (who is owed money vs. who owes money)
2. Match the largest creditor with the largest debtor
3. Create a transaction for the minimum of their amounts
4. Repeat until all debts are settled

This mathematical approach ensures you make the fewest possible transactions while settling all debts fairly.`,
    },
    {
      title: 'Managing Group Trip Expenses: A Complete Guide',
      date: 'September 2024',
      content: `Planning a group trip? Here's how to manage expenses smoothly:

**Before the Trip**
- Agree on a budget range
- Decide if expenses will be split equally or proportionally
- Designate someone to track expenses
- Set up a shared expense tracking method

**During the Trip**
- Keep all receipts
- Record expenses immediately
- Use a consistent currency
- Note who paid and who participated in each expense

**Common Categories**
- Accommodation (usually split equally)
- Transportation (car rentals, gas, taxis)
- Meals (can be individual or shared)
- Activities (only split among participants)
- Shared supplies (sunscreen, snacks, etc.)

**After the Trip**
- Enter all expenses into BillSplit.io within a few days
- Review the settlement plan together
- Use the simplified settlement to minimize transactions
- Settle up promptly using digital payment methods

**Pro Tips**
- Take photos of receipts as backup
- Create a shared folder for expense documentation
- Don't forget tips and service charges
- Account for advance bookings and deposits
- Be clear about what's included vs. optional`,
    },
    {
      title: 'Roommate Finances 101: Splitting Household Costs',
      date: 'August 2024',
      content: `Living with roommates? Here's how to handle shared expenses:

**Fixed Monthly Expenses**
- Rent (usually split equally or by room size)
- Utilities (electric, water, gas, internet)
- Streaming services
- Cleaning supplies

**Variable Expenses**
- Groceries (can be shared or individual)
- Household items
- Maintenance and repairs
- Furniture and appliances

**Best Practices**
1. **Set Up a System**: Decide how you'll track and split expenses from day one
2. **Monthly Settlement**: Use BillSplit.io at the end of each month to settle up
3. **Shared Account**: Consider a shared bank account for fixed expenses
4. **Communication**: Have regular check-ins about finances
5. **Documentation**: Keep records of all shared purchases

**Common Scenarios**
- **Unequal Room Sizes**: Adjust rent proportionally to square footage
- **Different Utility Usage**: Split equally unless there's a significant disparity
- **Guest Expenses**: Decide if frequent guests should contribute
- **Move-Out**: Plan how to handle the security deposit and final bills

**Red Flags to Avoid**
- Letting expenses accumulate without settling
- Not documenting who paid for what
- Assuming instead of discussing
- Mixing personal and shared expenses`,
    },
  ];

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
          Expert advice on managing shared expenses, splitting bills fairly, and simplifying group finances
        </Typography>

        <Grid container spacing={4}>
          {articles.map((article, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Published: {article.date}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}
                >
                  {article.content}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, p: 4, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Ready to Split Bills the Smart Way?
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Use our free bill splitting calculator to manage your group expenses easily and fairly.
            No registration required - start calculating now!
          </Typography>
        </Box>
      </Container>

      <SiteFooter />
    </PageWrapper>
  );
};
