import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useNavigateTo } from "../../hooks/";
import { SiteFooterWrapper } from "./index";

export const SiteFooter: React.FC = () => {
  const { navigateToGroupMemberPage } = useNavigateTo();

  return <SiteFooterWrapper></SiteFooterWrapper>;
};
