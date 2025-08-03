import React from "react";
// import Email from "@mui/icons-material/X";
import { SiteHeaderWrapper } from "./index";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";

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
        icon={<ContactMailOutlinedIcon color="primary" fontSize="small" />}
        label="Contact: bill.split.io@gmail.com"
        variant="outlined"
        component="a"
        style={{ marginRight: "10px", padding: "5px" }}
      />
    </SiteHeaderWrapper>
  );
};
