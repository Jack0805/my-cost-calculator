import React from "react";
import { SiteFooterWrapper } from "./index";
import { FooterModal } from "../PrivacyModal";
import Typography from "@mui/material/Typography";

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <SiteFooterWrapper>
      <footer>
        <FooterModal />
        <Typography sx={{ fontSize: "0.75rem" }}>
          Copyright © {currentYear} Bill Split. All Rights Reserved.
        </Typography>
      </footer>
    </SiteFooterWrapper>
  );
};
