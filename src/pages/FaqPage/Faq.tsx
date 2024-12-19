import React, { useState, useRef, useEffect } from "react";
import { FaqPageWrapper } from "./index";
import { SiteHeader, SiteFooter } from "../../components";
import faqData from "../../content/faq.json";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Helmet } from "react-helmet";
import uniqid from "uniqid";

export const FaqPage: React.FC = () => {
  return (
    <FaqPageWrapper>
      <Helmet>
        <title>Bill Split: Frequently Asked Questions</title>
        <meta
          name="description"
          content="Find answers to your questions about splitting bills, sharing expenses, and using the Bill Split app effectively."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "FAQ",
            url: "https://billsplit.io/faq",
            description:
              "Frequently asked questions about Bill Split. Learn how to share expenses, split bills, and manage group costs efficiently.",
          })}
        </script>
        <meta
          name="keywords"
          content="FAQ, bill splitting, shared expenses, group costs, split bills"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://billsplit.io/faq" />
      </Helmet>
      <SiteHeader />
      <Typography variant="h5" gutterBottom>
        Frequent Asking Questions
      </Typography>
      <Paper
        sx={{
          height: "75vh",
          width: "85%",
          padding: "15px",
          overflowY: "auto",
        }}
        elevation={3}
      >
        <div>
          {faqData.map((faq, index) => (
            <Accordion key={uniqid()} defaultExpanded={index < 4}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <strong>{faq.question}</strong>
              </AccordionSummary>
              <AccordionDetails>{faq.answer}</AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Paper>
      <SiteFooter />
    </FaqPageWrapper>
  );
};
