import React from "react";
import { SiteHeaderWrapper } from "./index";
import { Link } from "react-router-dom";

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
    </SiteHeaderWrapper>
  );
};
