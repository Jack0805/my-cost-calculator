import React from "react";
import { Link } from "react-router-dom";
import { ImageWrapper } from "../LandingPage";
import { PageNotFoundWrapper } from "./index";
import pageNotFoundImage from "../../assets/images/404.webp";

export const PageNotFound: React.FC = () => {
  return (
    <PageNotFoundWrapper>
      <ImageWrapper>
        <img
          src={pageNotFoundImage}
          alt="Bill Split 404"
          title="Bill Split 404"
          style={{ width: "100%", height: "auto", margin: "20px 0" }}
          loading="lazy"
        />
      </ImageWrapper>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </PageNotFoundWrapper>
  );
};
