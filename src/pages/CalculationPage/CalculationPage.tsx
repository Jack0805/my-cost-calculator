import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { CalculationPageWrapper } from "./CalculationPage.styles";
import {
  calculateDetailedDebts,
  filterSharedItems,
  convertDebts,
  groupItemsByPaidBy,
  BillsSummary,
} from "../../utils/helpers";
import { CustomizedSteppers } from "../../components";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Chip } from "@mui/material";
import Alert from "@mui/material/Alert";

import uniqid from "uniqid";
import { SiteHeader, SiteFooter } from "../../components";
import { ButtonGroupWrapper } from "../../utils/Global.styles";

import { removeItem } from "../../store/costItemsSlice";
import { removeMember } from "../../store/groupMembersSlice";

import { ResponsiveDialog } from "../../components/";

function createData(
  name: string,
  shallPayAmount: number[],
  BillsSummary: BillsSummary
) {
  return {
    name,
    shallPayAmount,
    BillsSummary,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const paidAnyBill = row.BillsSummary[row.name].length > 0;
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "&:hover": {
            backgroundColor: "lightgreen", // Highlight on hover
            cursor: "pointer", // Optional: change cursor to pointer
          },
          background: "#e3e8e4",
          // Keep existing border styling
        }}
        onClick={() => setOpen(!open)}
      >
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell component="th" scope="row">
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.name}
        </TableCell>
        {row.shallPayAmount.map((amount, index) => (
          <TableCell key={uniqid()} align="center">
            {`$${amount}`}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {paidAnyBill ? "Bills Paid" : "No Bills Paid"}
              </Typography>
              {paidAnyBill && (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Bill Name</TableCell>
                      <TableCell align="center">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.BillsSummary[row.name].map((historyRow) => (
                      <TableRow key={uniqid()}>
                        <TableCell align="center">
                          <Chip
                            label={<strong>{historyRow.itemName}</strong>}
                            color="success"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {(Math.round(historyRow.amount * 100) / 100).toFixed(
                            2
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const CalculationPage: React.FC = () => {
  const { navigateToLandingPage, navigateBack } = useNavigateTo();
  const dispatch = useAppDispatch();
  const names = useAppSelector((state) => state.groupMember.names);
  const items = useAppSelector((state) => state.costItems.items);
  const result = convertDebts(
    calculateDetailedDebts(filterSharedItems(items)),
    names
  );

  const rows = result.map((item) =>
    createData(item.name, item.owes, groupItemsByPaidBy(items, names))
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CalculationPageWrapper>
      <SiteHeader />
      <CustomizedSteppers currentStep={2} />
      <Alert severity="info" sx={{ width: "80%" }}>
        In each row, the person in the "Payee" column should pay each person in
        the right columns the specified amount shown below their names.
      </Alert>
      <Paper
        sx={{
          height: "40vh",
          width: "80%",
          padding: "25px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
        elevation={3}
      >
        <TableContainer
          component={Paper}
          sx={{
            "& > :not(style)": { m: 1 },
          }}
        >
          <Table aria-label="collapsible table" stickyHeader>
            <TableHead>
              <TableRow sx={{ height: "10px" }}>
                <TableCell padding="none" align="center">
                  Payee
                </TableCell>
                {names.map((name) => {
                  return (
                    <TableCell padding="none" key={uniqid()} align="center">
                      {name}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={uniqid()} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ButtonGroupWrapper>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "25%", // Set the width
            height: "50px", // Set the height
            marginTop: "20px",
          }}
          onClick={() => navigateBack()}
        >
          BACK
        </Button>
        <Button
          sx={{
            width: "25%", // Set the width
            height: "50px", // Set the height
            marginTop: "20px",
          }}
          autoFocus
          onClick={handleClickOpen}
        >
          Reset
        </Button>
      </ButtonGroupWrapper>
      <SiteFooter />
      <ResponsiveDialog
        title="Are You Sure You Want to Reset the Calculation?"
        description="If you reset the form, all results and data will be lost. Please make sure you have a screenshot of the table. Do you want to continue?"
        fullScreen={false}
        open={open}
        handleClose={handleClose}
        showContinueButton
        handleContinue={() => {
          dispatch(removeItem());
          dispatch(removeMember());
          navigateToLandingPage();
        }}
        CloseButtonName="No"
      />
    </CalculationPageWrapper>
  );
};
