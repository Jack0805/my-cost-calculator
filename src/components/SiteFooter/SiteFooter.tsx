import React from "react";
import { SiteFooterWrapper } from "./index";
import Typography from "@mui/material/Typography";

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <SiteFooterWrapper>
      <footer>
        <Typography>
          Copyright © {currentYear} Bill Split. All Rights Reserved.
        </Typography>
      </footer>
    </SiteFooterWrapper>
  );
};
