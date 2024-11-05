import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useNavigateTo } from "../../hooks/";
import { SiteHeaderWrapper } from "./index";

export const SiteHeader: React.FC = () => {
  const { navigateToGroupMemberPage } = useNavigateTo();

  return (
    <SiteHeaderWrapper>
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" width="200" />
    </SiteHeaderWrapper>
  );
};
