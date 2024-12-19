import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { ButtonWrapper } from "./index";
import { useNavigateTo } from "../../hooks/";

// Define the types for modal content keys
type ModalType = "privacy" | "terms";

// Define the modal content type
const modalContent: Record<
  ModalType,
  { title: string; content: React.ReactNode; button: string }
> = {
  privacy: {
    title: "Privacy Policy",
    content: (
      <div>
        <Typography variant="caption" gutterBottom>
          Effective Date: 30/11/2024
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          At Bill Split (accessible via billsplit.io), we value your privacy and
          are committed to protecting your personal information. This Privacy
          Policy outlines how we collect, use, and safeguard your data.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          1. Data We Collect
        </Typography>
        <Typography variant="body1" gutterBottom>
          Our app collects minimal data to provide and improve its
          functionality:
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          1.1 Local Storage Data:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • All bill-splitting information (e.g., group members, expenses,
          results) is stored locally on your device. This data is never sent to
          our servers or shared with third parties.
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • You have full control to clear or reset this data at any time.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          1.2 Google Analytics:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • We use Google Analytics to collect anonymous usage statistics, such
          as Pages visited, Time spent on the app and Interaction events (e.g.,
          button clicks)
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • This data helps us understand how users interact with the app and
          identify areas for improvement. Google Analytics collects this data in
          aggregate and does not identify individual users.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          2. How We Use Your Data
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          2.1 Local Storage Data:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • Your locally stored data is used solely for functionality within the
          app (e.g., calculating expenses, generating reports). It remains on
          your device and is not transmitted or accessible to us.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          2.2 Google Analytics Data:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • We analyze aggregated usage data to enhance the app's features,
          improve user experience, and troubleshoot issues.
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • This data is used strictly for internal purposes and never shared
          with third parties beyond Google Analytics.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          3. Third-Party Services
        </Typography>
        <Typography variant="body1" gutterBottom>
          We use the following third-party service:
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          3.1 Google Analytics:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • Google Analytics collects usage data as described above. For more
          information, please review Google’s Privacy Policy.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          4. Your Control Over Data
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          4.1 Local Storage:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • You can manage or delete the data stored in local storage through
          your browser settings or by using the app's reset feature.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          4.2 Google Analytics:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • You can opt out of Google Analytics tracking by installing the
          Google Analytics Opt-out Browser Add-on.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          5. Security
        </Typography>
        <Typography variant="body1" gutterBottom>
          We prioritize your privacy and do not store sensitive or personally
          identifiable information. As your data is stored locally on your
          device, its security depends on your browser and device settings.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          6. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" gutterBottom>
          We may update this Privacy Policy periodically to reflect changes in
          our app or legal requirements. Any updates will be posted here with a
          revised effective date.
        </Typography>
      </div>
    ),
    button: "Close",
  },
  terms: {
    title: "Terms of Use",
    content: (
      <div>
        <Typography variant="caption" gutterBottom>
          Effective Date: 30/11/2024
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Welcome to Bill Split (accessible via billsplit.io). These Terms of
          Use ("Terms") govern your access to and use of our bill-splitting web
          application.
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "black" }} gutterBottom>
          By using our app, you agree to comply with these Terms. If you do not
          agree, please do not use the app.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          1. General Usage
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          1.1 Purpose:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • The app is designed to simplify the process of splitting shared
          expenses among groups. It provides calculations and facilitates
          tracking of shared costs but does not process payments.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          1.2 Eligibility:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • By using this app, you confirm that you are at least 18 years old or
          have obtained parental/guardian consent.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          2. Data Storage
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          2.1 Local Storage:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • All data you enter (e.g., expenses, group member details) is stored
          locally in your device's browser storage. This data is not transmitted
          to our servers or shared with third parties.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          2.2 Control of Data:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • You have full control to clear or reset your data through your
          browser settings or the app’s reset feature.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          3. Analytics
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          3.1 Google Analytics:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • We use Google Analytics to collect anonymous usage data to improve
          the app. This includes information about how you use the app (e.g.,
          page views, button clicks) but does not include personal or sensitive
          information.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          3.2 Opt-Out:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • You can opt out of Google Analytics tracking by installing the
          Google Analytics Opt-out Browser Add-on.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          4. Limitations of Liability
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          4.1 Accuracy of Results:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • While we strive to provide accurate calculations, the results
          provided by the app are for informational purposes only. We are not
          responsible for any disputes or discrepancies arising from the use of
          the app.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          4.2 Service Availability:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • We make no guarantees about the app’s uptime or functionality. The
          app may be temporarily unavailable for maintenance or other reasons.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          4.3 No Liability for Damages:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • We are not liable for any direct, indirect, incidental, or
          consequential damages arising from your use of the app.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          5. User Responsibilities
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          5.1 Input Accuracy:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • You are responsible for ensuring the accuracy of the data you input
          into the app.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          5.2 Use of Data:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • You are solely responsible for how you use the app’s output (e.g.,
          sharing expense details with others).
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          6. Modifications to Terms
        </Typography>
        <Typography variant="body1" gutterBottom>
          We reserve the right to modify these Terms at any time. Any changes
          will be effective upon posting the updated Terms on this page. Your
          continued use of the app after such changes constitutes your
          acceptance of the new Terms.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          7. Termination
        </Typography>
        <Typography variant="body1" gutterBottom>
          We reserve the right to suspend or terminate your access to the app at
          our discretion and without notice if you violate these Terms.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          8. Intellectual Property
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          8.1 Ownership:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • All rights, title, and interest in and to the app, including its
          design, code, and content, are owned by us or our licensors.
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "black" }} gutterBottom>
          8.2 Use of Data:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          • You are granted a limited, non-exclusive, non-transferable license
          to use the app for personal, non-commercial purposes.
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          9. Governing Law
        </Typography>
        <Typography variant="body1" gutterBottom>
          These Terms are governed by and construed in accordance with the laws
          of Australia. Any disputes arising from the use of the app will be
          subject to the exclusive jurisdiction of the courts in Australia.
        </Typography>
      </div>
    ),
    button: "Agree",
  },
};

export function FooterModal() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<ModalType>("privacy");
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const { navigateToFaqPage, navigateToLandingPage } = useNavigateTo();

  const handleClickOpenPrivacy = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setActive("privacy");
    setScroll(scrollType);
  };

  const handleClickOpenTerms = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setActive("terms");
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <ButtonWrapper>
        <Button onClick={navigateToLandingPage} sx={{ fontSize: "0.65rem" }}>
          Home
        </Button>
        <Button
          onClick={handleClickOpenPrivacy("paper")}
          sx={{ fontSize: "0.65rem" }}
        >
          Privacy
        </Button>
        <Button
          onClick={handleClickOpenTerms("paper")}
          sx={{ fontSize: "0.65rem" }}
        >
          Terms of Use
        </Button>
        <Button onClick={navigateToFaqPage} sx={{ fontSize: "0.65rem" }}>
          FQA
        </Button>
      </ButtonWrapper>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {modalContent[active].title}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {modalContent[active].content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{modalContent[active].button}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
