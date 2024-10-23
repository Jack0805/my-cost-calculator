import React from "react";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";
import { useAppSelector } from "../../store/hooks";
import { CalculationPageWrapper } from "./CalculationPage.styles";
import {
  calculateDetailedDebts,
  filterSharedItems,
  convertDebts,
} from "../../utils/helpers";

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

function createData(name: string, shallPayAmount: number[]) {
  return {
    name,
    shallPayAmount,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        {row.shallPayAmount.map((amount, index) => (
          <TableCell key={index} align="right">
            {amount}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * 50 * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const CalculationPage: React.FC = () => {
  const { navigateBack } = useNavigateTo();
  const names = useAppSelector((state) => state.groupMember.names);
  const items = useAppSelector((state) => state.costItems.items);

  const test = [
    {
      name: "jack",
      owes: [1, 2, 3],
    },
    {
      name: "mia",
      owes: [1, 2, 3],
    },
    {
      name: "boris",
      owes: [1, 2, 3],
    },
  ];

  const participants = [
    {
      itemName: "wool",
      paidBy: "jack",
      amount: 100,
      shareBy: [
        { name: "jack", isShared: true },
        { name: "mia", isShared: true },
      ],
    },
    {
      itemName: "wool1",
      paidBy: "mia",
      amount: 10,
      shareBy: [
        { name: "mia", isShared: true },
        { name: "boris", isShared: true },
      ],
    },
    {
      itemName: "wool",
      paidBy: "mia",
      amount: 230,
      shareBy: [
        { name: "mia", isShared: true },
        { name: "jack", isShared: true },
        { name: "boris", isShared: true },
      ],
    },
    {
      itemName: "wool",
      paidBy: "boris",
      amount: 20,
      shareBy: [
        { name: "boris", isShared: true },
        { name: "mia", isShared: true },
      ],
    },
    {
      itemName: "wool2",
      paidBy: "boris",
      amount: 9,
      shareBy: [
        { name: "boris", isShared: true },
        { name: "jack", isShared: true },
        { name: "mia", isShared: true },
      ],
    },
  ];

  const result = convertDebts(
    calculateDetailedDebts(filterSharedItems(items)),
    names
  );

  const result1 = calculateDetailedDebts(filterSharedItems(items));

  console.log(result1);

  const rows = result.map((item) => createData(item.name, item.owes));

  return (
    <CalculationPageWrapper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              {names.map((name, index) => {
                return (
                  <TableCell key={index} align="right">
                    {name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          width: "100%", // Set the width
          height: "50px", // Set the height
          marginTop: "30px",
        }}
        onClick={() => navigateBack()}
      >
        BACK
      </Button>
    </CalculationPageWrapper>
  );
};
