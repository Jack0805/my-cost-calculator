import React from "react";
import XIcon from "@mui/icons-material/X";
import { SiteHeaderWrapper } from "./index";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";

export const SiteHeader: React.FC = () => {
  return (
    <SiteHeaderWrapper>
      <Link to="/">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          width="200"
        />
      </Link>
      <Chip
        icon={<XIcon color="primary" fontSize="small" />}
        label="Contact"
        variant="outlined"
        component="a"
        clickable
        target="_blank" // Open link in a new tab
        rel="noopener noreferrer" // For security
        href="https://x.com/billsplit_io"
        style={{ marginRight: "10px", padding: "5px" }}
      />
    </SiteHeaderWrapper>
  );
};
