import React from "react";
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
        label="bill.split.io@gmail.com"
        variant="outlined"
        component="a"
        style={{ marginRight: "10px", padding: "5px" }}
      />
    </SiteHeaderWrapper>
  );
};
