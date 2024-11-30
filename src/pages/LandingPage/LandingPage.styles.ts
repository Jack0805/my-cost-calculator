import styled from "styled-components";

export const LandingPageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const LandingContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const ImageWrapper = styled.div`
  max-width: 40%;
  @media (max-width: 768px) {
    max-width: 80%;
  }
`;
