import React, { useState, useRef } from "react";
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
  simplifySettlement,
  transformToResults,
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
import { Chip } from "@mui/material";

import uniqid from "uniqid";
import { SiteHeader, SiteFooter } from "../../components";
import { ButtonGroupWrapper } from "../../utils/Global.styles";

import { removeItem } from "../../store/costItemsSlice";
import { removeMember } from "../../store/groupMembersSlice";

import { ResponsiveDialog } from "../../components/";
import { Helmet } from "react-helmet";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { trackEvent } from "../../utils/analytics";
import { persistor } from "../../store/store";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

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
        <TableCell component="th" scope="row">
          <IconButton aria-label="expand row" size="small">
            {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
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
  const simpleResult = simplifySettlement(transformToResults(result));
  const [isSimplestSettlement, setIsSimplestSettlement] = useState(true);

  const rows = result.map((item) =>
    createData(item.name, item.owes, groupItemsByPaidBy(items, names))
  );

  const [open, setOpen] = useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSimplestSettlement(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tableRef = useRef<HTMLDivElement>(null); // Use a type-safe ref for the table
  const simpleResultRef = useRef<HTMLDivElement>(null); // Ref for simple settlement view

  const generateSimplePDF = async () => {
    if (!simpleResultRef.current) return;

    try {
      const canvas = await html2canvas(simpleResultRef.current, {
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const pdf = new jsPDF('portrait');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = (pdfHeight - 40) / imgHeight; // Reserve space for title
      const ratio = Math.min(widthRatio, heightRatio);

      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      const xOffset = (pdfWidth - scaledWidth) / 2;
      const yOffset = 48;

      // Add website branding at the top
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(25, 118, 210); // Material-UI primary blue color
      pdf.text("BillSplit.io", pdfWidth / 2, 12, { align: "center" });

      // Add tagline
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      pdf.text("Split Bills Effortlessly - 100% Free Forever", pdfWidth / 2, 18, { align: "center" });

      // Add clickable link
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(9);
      pdf.text("https://billsplit.io", pdfWidth / 2, 24, { align: "center" });
      pdf.link(pdfWidth / 2 - 20, 21, 40, 4, { url: "https://billsplit.io" });

      // Add separator line
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(20, 28, pdfWidth - 20, 28);

      // Add a title with the date
      const now = new Date();
      const resultDate = now.toLocaleDateString();
      const resultTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      pdf.setTextColor(0, 0, 0); // Reset to black
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text(`Bill Splitting Results`, pdfWidth / 2, 35, { align: "center" });

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(`${resultDate} ${resultTime}`, pdfWidth / 2, 40, { align: "center" });

      // Add explanatory text under the title
      const explanation = "Simplified Settlement Plan - Minimum transactions needed";
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      pdf.text(explanation, pdfWidth / 2, 45, { align: "center" });

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        xOffset,
        yOffset,
        scaledWidth,
        scaledHeight
      );

      const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
      const fileName = `bill-split-simple-${timestamp}.pdf`;

      const blob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");

      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

      const pdfDetails = {
        file_name: fileName,
        type: 'simple_settlement',
        results: JSON.stringify(simpleResult),
      };
      trackEvent("click", "Button", "Download Simple PDF Done", 1, pdfDetails);
    } catch (error) {
      trackEvent("click", "Button", `Error generating simple PDF: ${error}`);
      console.error("Error generating simple PDF:", error);
    }
  };

  const generatePDF = async () => {
    if (!tableRef.current) return;

    try {
      const originalOverflow = tableRef.current.style.overflow;
      const originalWidth = tableRef.current.style.width;
      const originalHeight = tableRef.current.style.height;
      tableRef.current.style.width = "1920px";
      tableRef.current.style.height = "5000px";
      tableRef.current.style.overflow = "visible";

      const canvas = await html2canvas(tableRef.current, {
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        scale: 2,
      });

      tableRef.current.style.width = originalWidth;
      tableRef.current.style.height = originalHeight;
      tableRef.current.style.overflow = originalOverflow;

      const pdf = new jsPDF("landscape");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = pdfHeight / imgHeight;
      const ratio = Math.min(widthRatio, heightRatio);

      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      const xOffset = 0;
      const yOffset = 35; // Increased from 30 to 35 for more spacing

      // Add website branding at the top
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(25, 118, 210); // Material-UI primary blue color
      pdf.text("BillSplit.io", pdfWidth / 2, 8, { align: "center" });

      // Add tagline
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      pdf.text("Split Bills Effortlessly - 100% Free Forever", pdfWidth / 2, 13, { align: "center" });

      // Add clickable link
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(9);
      pdf.text("https://billsplit.io", pdfWidth / 2, 18, { align: "center" });
      pdf.link(pdfWidth / 2 - 20, 15, 40, 4, { url: "https://billsplit.io" });

      // Add separator line
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(20, 21, pdfWidth - 20, 21);

      // Add a title with the date
      const now = new Date();
      const resultDate = now.toLocaleDateString(); // Date in MM/DD/YYYY format (based on locale)
      const resultTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }); // Time in HH:mm format
      pdf.setTextColor(0, 0, 0); // Reset to black
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text(`Bill Splitting Results`, pdfWidth / 2, 26, { align: "center" }); // Center the title

      // Add date and time
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(`${resultDate} ${resultTime}`, pdfWidth / 2 + 50, 26, { align: "left" });

      // Add explanatory text under the title (make it shorter for landscape) - with more spacing
      const explanation = "Detailed breakdown: Each row shows a payer and the amounts owed to others.";
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      pdf.text(explanation, pdfWidth / 2, 32, { align: "center" }); // Moved from 29 to 32 for more spacing between title and explanation

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        xOffset,
        yOffset,
        scaledWidth,
        scaledHeight
      );

      const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
      const fileName = `bill-split-${timestamp}.pdf`;
      // Instead of pdf.save(), use the following:
      const blob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
      // Clean up the blob URL after a delay
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      // pdf.save(fileName);
      const pdfDetails = {
        file_name: fileName,
        results: JSON.stringify(result), // File size in KB
      };
      trackEvent("click", "Button", "Download PDF Done", 1, pdfDetails);
    } catch (error) {
      trackEvent("click", "Button", `Error generating PDF: ${error}`);
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <CalculationPageWrapper>
      <Helmet>
        <title>Bill Split Results | Fair Expense Sharing</title>
        <meta
          name="google-adsense-account"
          content="ca-pub-5022597811159483"
        ></meta>
        <meta
          name="description"
          content="View the results of your group expense split. See who owes whom and how much with accurate calculations."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Calculation Results",
            url: "https://billsplit.io/calculation",
            description:
              "View the final calculation results for your bill-splitting session. See who owes whom and how much.",
          })}
        </script>
        <meta
          name="keywords"
          content="bill split results, shared expenses, group costs, expense calculations"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://billsplit.io/calculation/" />
      </Helmet>
      <SiteHeader />
      <CustomizedSteppers currentStep={2} />
      <Paper
        sx={{
          height: "60vh",
          width: "85%",
          padding: "15px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
        elevation={3}
      >
        <Typography variant="overline" sx={{ display: "block" }}>
          Step 3. Payer owes each person the amounts listed
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isSimplestSettlement}
                onChange={handleSwitchChange}
              />
            }
            label="Show simplest settlement way"
          />
        </FormGroup>
        {isSimplestSettlement ? (
          <div ref={simpleResultRef} style={{ padding: '20px' }}>
            {simpleResult.map((result, index) => (
              <Typography
                variant="body2"
                key={uniqid()}
                gutterBottom
                sx={{
                  fontSize: '14px',
                  mb: 1.2,
                  lineHeight: 1.6
                }}
              >
                {`${index + 1}. ${result.from} pays ${result.to} $${result.amount}`}
              </Typography>
            ))}
          </div>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              "& > :not(style)": { m: 1 },
              overflow: "auto",
            }}
            ref={tableRef}
          >
            <Table aria-label="collapsible table" stickyHeader>
              <TableHead>
                <TableRow sx={{ height: "10px", width: "33%" }}>
                  <TableCell
                    padding="none"
                    align="center"
                    sx={{ width: "120px", minWidth: "100px", maxWidth: "150px" }}
                  >
                    Payer
                  </TableCell>
                  {names.map((name) => {
                    return (
                      <TableCell
                        padding="none"
                        key={uniqid()}
                        sx={{ minWidth: "80px" }}
                        align="center"
                      >
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
        )}
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
          aria-label="Start Splitting Bills"
        >
          BACK
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: "25%", // Set the width
            height: "50px", // Set the height
            marginTop: "20px",
          }}
          autoFocus
          onClick={isSimplestSettlement ? generateSimplePDF : generatePDF}
          aria-label="Download PDF"
        >
          Download PDF
        </Button>
        <Button
          sx={{
            width: "25%", // Set the width
            height: "50px", // Set the height
            marginTop: "20px",
          }}
          autoFocus
          onClick={handleClickOpen}
          aria-label="Start Splitting Bills"
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
          persistor.purge();
          navigateToLandingPage();
        }}
        CloseButtonName="No"
      />
    </CalculationPageWrapper>
  );
};
